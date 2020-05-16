const express = require('express');
const router = express.Router();
const data = require('../data');
const propertyData = data.property;
const imageData = data.image;
const userData = data.user;
const base64Img = require('base64-img');
const ObjectId = require('mongodb').ObjectID;
const checkAuth = require('./checkAuth');

const bluebird = require("bluebird");
const redis = require("redis");
const client = redis.createClient();
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
let allC = []

// clear redis
// client.FLUSHDB();

router.get('/', async (req, res) => {
    let allSave = ""
    let page = 1;
    let sort;
    let filter;
    try {
        if(req.query.page) {
            if (req.query.page === undefined) throw "page is undefinded";
            page = parseInt(req.query.page);
            if(isNaN(page)) throw "page is not a valid number";
            if (page < 1 ) throw "page is not a positive number";
            
        }
        
        if(req.query.sort && req.query.sort !== "null"){
            sort = req.query.sort; 
        }else{
            sort = null;
        }
        if (req.query.filter && req.query.filter !== "null"){
            filter = req.query.filter;
        }else{
            filter = null;
        }
        
        console.log(filter, sort)
        allSave = "all"+filter+sort        
    } catch (e) {
        res.status(400).json({error: "invalid parameter"});
        return;
    }

    let resData;
    try {
        let allCExist = await client.existsAsync(allSave+"c");
        let allExist = await client.existsAsync(allSave);
        if(allCExist&&allExist){            
            let jsonProperty = await client.getAsync(allSave);
            resData = JSON.parse(jsonProperty);
        } else {            
            // console.log("I'm hrere, check me!!!!!!!!!")
            resData = await propertyData.getAll(page, filter, sort);
            // console.log("I'm hrere, check me, again!!!!!!!!!")
            // res.json(resData);

            for (let property of resData.properties) {
                let albumIds = property.album
                property.album = []
                for (let imageId of albumIds) {
                    property.album.push(await imageData.getPhotoDataId(imageId));
                }
            }

            let jsonProperty = JSON.stringify(resData)
            await client.setAsync(allSave, jsonProperty);
            await client.setAsync(allSave+"c", true);
            allC.push(allSave+"c")
        }
    // } catch (e) {
    //     res.status(500).json({error: e});
    //     return
    // }

    // get images data
    // try {
        // for (let property of resData.properties) {
        //     let albumIds = property.album
        //     property.album = []
        //     for (let imageId of albumIds) {
        //         property.album.push(await imageData.getPhotoDataId(imageId));
        //     }
        // }
        res.json(resData);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        if (id === undefined)  throw "id is undefinded";
        if (!ObjectId.isValid(id)) throw "id is invalid";
        if (typeof id != "string") id = id.toString();
    } catch (e) {
        res.status(400).json({error: e});
        return;
    }

    let property

    let propertyExist = await client.existsAsync("property"+req.params.id);
    if(propertyExist){
        console.log(1);
        
        let jsonProperty = await client.getAsync("property"+req.params.id);
        property = JSON.parse(jsonProperty);
    } else {
        console.log(2);
        
        try {
            property = await propertyData.getById(req.params.id);
        } catch (e) {
            res.status(404).json({error: 'property not found'});
            return;
        }

        // get images data
        try {
            let albumIds = property.album
            property.album = []
            for (let imageId of albumIds) {
                property.album.push(await imageData.getPhotoDataId(imageId));
            }
        } catch (e) {
            res.status(500).json({error: e});
            return;
        }

        // get owner data
        try {
            let ownerId = property.owner
            property.owner = await userData.getUser(ownerId);
            // res.json(property);
        } catch (e) {
            res.status(500).json({error: e});
        }

        let jsonProperty = JSON.stringify(property)
        await client.setAsync("property"+req.params.id, jsonProperty);
    }
    res.json(property);
});

router.post('/', checkAuth, async (req, res) => {
    let propertyInfo = req.body;
    let owner = res.locals.userUid;
    // try {
    //     if (propertyInfo.title === undefined) throw "title is undefinded";
    //     if (typeof taskInfo.title != "string") throw "title is not a string";
    //     if (taskInfo.description === undefined) throw "description is undefinded";
    //     if (typeof taskInfo.description != "string") throw "description is not a string";
    //     if (taskInfo.hoursEstimated === undefined) throw "hoursEstimated is undefinded";
    //     if (typeof taskInfo.hoursEstimated != "number") throw "hoursEstimated is not of the proper type";
    //     if (taskInfo.hoursEstimated <= 0 ) throw "hoursEstimated is not a positive number";
    //     if (taskInfo.completed === undefined) throw "completed is undefinded";
    //     if (typeof taskInfo.completed != "boolean") throw "completed is not of the proper type";
    // } catch (e) {
    //     res.status(400).json({error: e});
    //     return;
    // }

    let imagesInfo = propertyInfo.album;
    propertyInfo.album = []

    try {
        for (let i = 0; i < imagesInfo.length; i++) {
            imageData.validateBase64(imagesInfo[i][2])
            let filepath = await base64Img.imgSync(imagesInfo[i][2], './public/img', imagesInfo[i][0].split(".")[0]);            
            let id = await imageData.createGridFS(imagesInfo[i][0], imagesInfo[i][1], filepath);
            propertyInfo.album.push(id);
        }
    } catch (e) {
        res.status(500).json({error: "fail handling uploaded images"});
        return
    }
    
    try {
        const property = await propertyData.add(owner, propertyInfo);

        // reset all property redis
        for(let i=0; i<allC.length;i++){
            await client.delAsync(allC[i]);
        }
        allC = []

        res.json(property);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

router.put("/:id", checkAuth, async(req, res) => {
    let propertyBody = req.body;

    // get property  
    let property
    try {
        property = await propertyData.getById(req.params.id);
    } catch (e) {
        res.status(404).json({error: 'property not found'});
        return;
    }

    propertyBody.album = property.album

    // handle removed images
    try {
        let removedImages = propertyBody.removedImages
        let albumIds = propertyBody.album
        for (let imageId of albumIds) {
            let imgData = await imageData.getPhotoDataId(imageId)
            if (removedImages.includes(imgData)) {
                var index = propertyBody.album.indexOf(imageId);
                if (index > -1) {
                    propertyBody.album.splice(index, 1);
                    await imageData.deletePhoto(imageId)
                }                
            }
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "fail handling removed images"});
        return
    }

    // handle new added images
    try {
        let newImages = propertyBody.newImages
        for (let i = 0; i < newImages.length; i++) {
            imageData.validateBase64(newImages[i][2])
            let filepath = await base64Img.imgSync(newImages[i][2], './public/img', newImages[i][0].split(".")[0]);            
            let id = await imageData.createGridFS(newImages[i][0], newImages[i][1], filepath);
            propertyBody.album.push(id);
        }
    } catch (e) {
        res.status(500).json({error: "fail handling uploaded images"});
        return
    }

    try{
        let pid = req.params.id;
        // console.log("pid", propertyBody);
        const property = await propertyData.update(pid, propertyBody);

        // reset property redis
        await client.delAsync("property"+pid);
        for(let i=0; i<allC.length;i++){
            await client.delAsync(allC[i]);
        }
        allC = []

        res.json(property);
    }catch(e){
        res.status(500).json({error: e});
    }
})

router.delete('/:id', checkAuth, async (req, res) => {
    let ownerId = res.locals.userUid

    let property;
    try {
        property = await propertyData.getById(req.params.id);
    } catch (e) {
        res.status(404).json({error: "property not found"});
        return;
    }

    if (property.owner != ownerId) {
        res.status(403).json({error: "unauthorized"});
        return;
    }

    // remove images
    try {
        let albumIds = property.album
        for (let imageId of albumIds) {
            await imageData.deletePhoto(imageId)
        }                
    } catch (e) {
        res.status(500).json({error: "fail removing images"});
        return
    }

    try {
        const resData = await propertyData.delete(req.params.id, ownerId);
        resData.data = property

        // reset all property redis
        for(let i=0; i<allC.length;i++){
            await client.delAsync(allC[i]);
        }
        allC = []

        res.json(resData);
    } catch (e) {
        console.log(e)
        res.status(500).json({error: e});
        return;
    }
});

module.exports = router;

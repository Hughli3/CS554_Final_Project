const express = require('express');
const router = express.Router();
const data = require('../data');
const imageData = data.image;
const base64Img = require('base64-img');
const ObjectId = require('mongodb').ObjectID;

router.get('/:id', async (req, res) => {
    try {
        const image = await imageData.getPhotoDataId(req.params.id);
        res.json({data: image});
    } catch (e) {
        res.status(404).json({error: 'image not found'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const image = await imageData.deletePhoto(req.params.id);
        res.json({data: image});
    } catch (e) {
        res.status(404).json({error: 'image not found'});
    }
});

router.post('/', async (req, res) => {
    let imagesInfo = req.body.data;
    
    try {
        // console.log(imagesInfo);
        
        for(let i=0; i<imagesInfo.length; i++){
            imageData.validateBase64(imagesInfo[i][2])
            let filepath = await base64Img.imgSync(imagesInfo[i][2], './public/img', imagesInfo[i][0].split(".")[0]);
            console.log(filepath);
            
            await imageData.createGridFS(imagesInfo[i][0], imagesInfo[i][1], filepath);
        }
        // const image = await imageData.createGridFS(fileName, fileBase64);
        // res.json(image);
        res.json({accept: "accept"});
    } catch (e) {
        console.log(e);
        
        res.status(500).json({error: e});
    }
});

module.exports = router;

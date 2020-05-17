const express = require('express');
const router = express.Router();
const data = require('../data');
const propertyData = data.property;
const userData = data.user;
const imageData = data.image;
const base64Img = require('base64-img');
const checkAuth = require('./checkAuth')

const bluebird = require("bluebird");
const redis = require("redis");
const client = redis.createClient();
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

// clear redis
// client.FLUSHDB();

router.post('/', checkAuth, async (req, res) => {
    let userInfo = req.body;
    try {
        const user = await userData.getUser(userInfo.uid);
        res.json(user);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

router.patch('/', checkAuth, async (req, res) => {    
    let userBody = req.body;
    let skipAdd = false;
    let skipImage = true;
    for (let i of userBody.avatar) {
        if (i) skipImage = false
    }
    if (skipImage) {userBody.avatar = null}
    if (!skipImage) {
        // remove avatar
        try {
            let user = await userData.getUser(res.locals.userUid);

            if (user.avatar) {
                let avatarData = await imageData.getPhotoDataId(user.avatar)
                if (avatarData == userBody.avatar[2]) {
                    userBody.avatar = null;
                    skipAdd = true;
                } else {
                    await imageData.deletePhoto(user.avatar)
                }
            }
        } catch (e) {
            res.status(500).json({error: e});
            return
        }

        // add avatar
        if (!skipAdd) {
            try {
                let image = userBody.avatar
                imageData.validateBase64(image[2])
                let filepath = await base64Img.imgSync(image[2], './public/img', image[0].split(".")[0]);            
                let id = await imageData.createGridFS(image[0], image[1], filepath);
                userBody.avatar = id;
            } catch (e) {
                res.status(500).json({error: "fail handling uploaded avatar"});
                return
            }
        }
    }


    // update
    let userRes;
    try {
        userRes = await userData.updateUser(res.locals.userUid, userBody.phone, userBody.avatar);  
    } catch (e) {
        res.status(500).json({error: e});
        return;
    }

    // get avatar
    try {
        if (userRes.avatar) {
            userRes.avatar = await imageData.getPhotoDataId(userRes.avatar)
        }

        await client.delAsync("user"+res.locals.userUid)
        res.json(userRes);
    } catch (e) {
        res.status(500).json({error: e});
        return;
    }
});

router.get('/', checkAuth, async (req, res) => {
    let user;
    try {
        user = await userData.getUser(res.locals.userUid);
        let propertyList = user.property
        user.property = []
        for (let pid of propertyList) {
            user.property.push(await propertyData.getById(pid))
        }
    } catch (e) {
        res.status(500).json({error: e});
        return;
    }

    // get images data
    try {
        for (let property of user.property) {
            console.log(property)
            let albumIds = property.album
            property.album = []
            for (let imageId of albumIds) {
                property.album.push(await imageData.getPhotoDataId(imageId));
            }
        }
    } catch (e) {
        res.status(500).json({error: e});
        return;
    }

    // get avatar
    try {
        if (user.avatar) {
            user.avatar = await imageData.getPhotoDataId(user.avatar)
        }
        res.json(user);
    } catch (e) {
        res.status(500).json({error: e});
        return;
    }
});

router.get('/watchlist', checkAuth, async (req, res) => {
    try {
        let data

        let wlExist = await client.existsAsync(res.locals.userUid+"wl");
        if(wlExist){            
            let jsonWatchlist = await client.getAsync(res.locals.userUid+"wl");
            data = JSON.parse(jsonWatchlist);
        } else {
            const user = await userData.getUser(res.locals.userUid);
            data = {
                watchlist: user.watchlist,
                details: []
            }
            for (let pid of user.watchlist) {
                data.details.push(await propertyData.getById(pid))
            }

            let jsonWatchlist = JSON.stringify(data)
            await client.setAsync(res.locals.userUid+"wl", jsonWatchlist);
        }

        res.json(data)
    } catch (e) {
        res.status(500).json({error: e});
    }
});

router.post('/watchlist', checkAuth, async (req, res) => {
    let pid = req.body.propertyId;
    // is property valid
    try {
        await propertyData.getById(pid);
    } catch (e) {
        res.status(404).json({error: 'property not found'});
        return;
    }

    // add to watchlist
    try {
        const data = await userData.addWatchlist(pid, res.locals.userUid)
        await client.delAsync(res.locals.userUid+"wl")

        res.json({watchlist: data.watichlist});
    } catch (e) {
        res.status(500).json({error: e});
    }
});

router.delete('/watchlist/:pid', checkAuth, async (req, res) => {
    let pid = req.params.pid;
    // is property valid
    try {
        await propertyData.getById(pid);
    } catch (e) {
        res.status(404).json({error: 'property not found'});
        return;
    }

    // remove from watchlist
    try {
        const user = await userData.removeWatchlist(pid, res.locals.userUid)
        let data = {
            watchlist: user.watchlist,
            details: []
        }

        for (let pid of user.watchlist) {
            data.details.push(await propertyData.getById(pid))
        }
        console.log(data)

        await client.delAsync(res.locals.userUid+"wl")

        res.json(data)
    } catch (e) {
        res.status(500).json({error: e});
    }
});

router.get('/:id', async (req, res) => {
    let user;
    let userExist = await client.existsAsync("user"+req.params.id);
    
    if(userExist){
        let jsonUser = await client.getAsync("user"+req.params.id);
        user = JSON.parse(jsonUser);
    } else {
        try {
            let userId = req.params.id;
            user = await userData.getUser(userId);
        } catch (e) {
            res.status(404).json({error: 'user not found'});
            return;
        }

        try {
            const propertyList = user.property
            user.property = []
            for (let pid of propertyList) {
                user.property.push(await propertyData.getById(pid))
            }
        } catch (e) {
            res.status(500).json({error: e});
            return;
        }

        // get images data
        try {
            for (let property of user.property) {
                let albumIds = property.album
                property.album = []
                for (let imageId of albumIds) {
                    property.album.push(await imageData.getPhotoDataId(imageId));
                }
            }
            // res.json(user);
        } catch (e) {
            res.status(500).json({error: e});
            return
        }

        // get avatar
        try {
            if (user.avatar) {
                user.avatar = await imageData.getPhotoDataId(user.avatar)
            }
        } catch (e) {
            res.status(500).json({error: e});
            return;
        }

        let jsonUser = JSON.stringify(user)
        await client.setAsync("user"+req.params.id, jsonUser);
    }

    res.json(user);
});

module.exports = router;

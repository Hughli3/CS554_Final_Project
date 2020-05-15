const express = require('express');
const router = express.Router();
const data = require('../data');
const imageData = data.image;
const ObjectId = require('mongodb').ObjectID;

router.get('/:id', async (req, res) => {
    try {
        const image = await imageData.getPhotoDataId(req.params.id);
        res.json(image);
    } catch (e) {
        res.status(404).json({error: 'image not found'});
    }
});

router.post('/', async (req, res) => {
    let imagesInfo = req.body.data;
    
    try {
        for(let i=0; i<imagesInfo.length; i++){
            await imageData.createGridFS(imagesInfo[i][0], imagesInfo[i][1]);
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

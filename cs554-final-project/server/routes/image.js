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
    console.log(req.body)
    let imagesInfo = req.body.data;
    
    try {
        console.log(imagesInfo);
        console.log('-------------');

        let fileName = "req.body.data";
        let fileBase64 = "req.body.data";
        
        
        const image = await imageData.createGridFS(fileName, fileBase64);
        res.json(image);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

module.exports = router;

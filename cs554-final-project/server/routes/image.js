const express = require('express');
const router = express.Router();
const data = require('../data');
const imageData = data.img;
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
        
        
        // const image = await imageData.createGridFS(imagesInfo[0]);
        // res.json(image);
        res.json({'11':11});
    } catch (e) {
        res.status(500).json({error: e});
    }
});

module.exports = router;

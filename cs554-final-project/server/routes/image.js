const express = require('express');
const router = express.Router();
const data = require('../data');
const imageData = data.image;

router.get('/:id', async (req, res) => {
    try {
        const image = await imageData.getPhotoDataId(req.params.id);
        res.json({data: image});
    } catch (e) {
        res.status(404).json({error: 'image not found'});
    }
});

module.exports = router;

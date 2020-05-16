const express = require('express');
const router = express.Router();
const data = require('../data');
const propertyData = data.property;
const ObjectId = require('mongodb').ObjectID;
const checkAuth = require('./checkAuth');

router.get('/', async (req, res) => {
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
    } catch (e) {
        res.status(400).json({error: "invalid parameter"});
        return;
    }

    try {
        // console.log("I'm hrere, check me!!!!!!!!!")
        const resData = await propertyData.getAll(page, filter, sort);
        // console.log("I'm hrere, check me, again!!!!!!!!!")
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
    try {
        const property = await propertyData.getById(req.params.id);
        res.json(property);
    } catch (e) {
        res.status(404).json({error: 'property not found'});
    }
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
    
    try {
        const property = await propertyData.add(owner, propertyInfo);
        res.json(property);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

router.put("/:id", checkAuth, async(req, res) => {
    try{
        let propertyInfo = req.body;
        let pid = req.params.id;
        console.log("pid",propertyInfo);
        const property = await propertyData.update(pid, propertyInfo);
        res.json(property);
    }catch(e){
        console.log(e);
        res.status(404).json({error: e});
    }

})
// router.put('/:id', async (req, res) => {
//     let taskInfo = req.body;
//     try {
//         if (taskInfo.title === undefined) throw "title is undefinded";
//         if (typeof taskInfo.title != "string") throw "title is not a string";
//         if (taskInfo.description === undefined) throw "description is undefinded";
//         if (typeof taskInfo.description != "string") throw "description is not a string";
//         if (taskInfo.hoursEstimated === undefined) throw "hoursEstimated is undefinded";
//         if (typeof taskInfo.hoursEstimated != "number") throw "hoursEstimated is not of the proper type";
//         if (taskInfo.hoursEstimated <= 0 ) throw "hoursEstimated is not a positive number";
//         if (taskInfo.completed === undefined) throw "completed is undefinded";
//         if (typeof taskInfo.completed != "boolean") throw "completed is not of the proper type";
//     } catch (e) {
//         res.status(400).json({error: e});
//         return;
//     }
  
//     try {
//         await taskData.getById(req.params.id);
//     } catch (e) {
//         res.status(404).json({error: "task not found"});
//         return;
//     }

//     try {
//         const task = await taskData.update(req.params.id, taskInfo.title, taskInfo.description, taskInfo.hoursEstimated, taskInfo.completed);
//         res.json(task);
//     } catch (e) {
//         res.status(500).json({error: e});
//     }
// });


// router.patch('/:id', async (req, res) => {
//     let taskInfo = req.body;
//     try {
//         if (!(taskInfo.title !== undefined || taskInfo.description !== undefined || taskInfo.hoursEstimated !== undefined || taskInfo.completed !== undefined)) {
//             throw 'You must provide at least one of title, description, hoursEstimated, and completed';
//         }
//         if (taskInfo.title) {
//             if (typeof taskInfo.title != "string") throw "title is not a string";
//         }
//         if (taskInfo.description) {
//             if (typeof taskInfo.description != "string") throw "description is not a string";
//         }
//         if (taskInfo.hoursEstimated) {
//             if (typeof taskInfo.hoursEstimated != "number") throw "hoursEstimated is not of the proper type";
//             if (taskInfo.hoursEstimated <= 0 ) throw "hoursEstimated is not a positive number";
//         }
//         if (taskInfo.completed) {
//             if (typeof taskInfo.completed != "boolean") throw "completed is not of the proper type";
//         }
//     } catch (e) {
//         res.status(400).json({error: e});
//         return;
//     }
  
//     try {
//         await taskData.getById(req.params.id);
//     } catch (e) {
//         res.status(404).json({error: "task not found"});
//         return;
//     }

//     try {
//         const task = await taskData.update(req.params.id, taskInfo.title, taskInfo.description, taskInfo.hoursEstimated, taskInfo.completed);
//         res.json(task);
//     } catch (e) {
//         res.status(500).json({error: e});
//     }
// });

// router.post('/:id/comments', async (req, res) => {
//     try {
//         let id = req.params.id;
//         if (id === undefined)  throw "id is undefinded";
//         if (!ObjectId.isValid(id)) throw "id is invalid";
//         if (typeof id != "string") id = id.toString();
//     } catch (e) {
//         res.status(400).json({error: e});
//         return;
//     }
    
//     try {
//         await taskData.getById(req.params.id);
//     } catch (e) {
//         res.status(404).json({error: "task not found"});
//         return;
//     }

//     let commentInfo = req.body;
//     try {
//         if (commentInfo.name === undefined) throw "name is undefinded";
//         if (typeof commentInfo.name != "string") throw "name is not a string";
//         if (commentInfo.comment === undefined) throw "comment is undefinded";
//         if (typeof commentInfo.comment != "string") throw "comment is not a string";
//     } catch (e) {
//         res.status(400).json({error: e});
//         return;
//     }

//     try {
//         const comment = await commentData.add(commentInfo.name, commentInfo.comment, req.params.id);
//         res.json(comment);
//     } catch (e) {
//         res.status(500).json({error: e});
//     }
// });

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

    try {
        const resData = await propertyData.delete(req.params.id, ownerId);
        resData.data = property
        res.json(resData);
    } catch (e) {
        console.log(e)
        res.status(500).json({error: e});
        return;
    }

});

module.exports = router;

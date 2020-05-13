const express = require('express');
const router = express.Router();
const data = require('../data');
const propertyData = data.property;
const userData = data.user;
const ObjectId = require('mongodb').ObjectID;
const checkAuth = require('./checkAuth')

router.post('/', checkAuth, async (req, res) => {
    let userInfo = req.body;
    
    // try {
    //     if (taskInfo.title === undefined) throw "title is undefinded";
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
        const user = await userData.add(userInfo.uid);
        res.json(user);
    } catch (e) {
        res.status(500).json({error: e});
    }
});

router.get('/', checkAuth, async (req, res) => {
    try {
        const user = await userData.getUser(res.locals.userUid);
        let propertyList = user.property
        user.property = []
        for (let pid of propertyList) {
            user.property.push(await propertyData.getById(pid))
        }

        res.json(user)
    } catch (e) {
        res.status(500).json({error: e});
    }
});

router.get('/watchlist', checkAuth, async (req, res) => {
    try {
        const user = await userData.getUser(res.locals.userUid);
        let data = {
            watchlist: user.watchlist,
            details: []
        }
        for (let pid of user.watchlist) {
            data.details.push(await propertyData.getById(pid))
        }

        res.json(data)
    } catch (e) {
        res.status(500).json({error: e});
    }
});

router.get('/property', checkAuth, async (req, res) => {
    try {
        const user = await userData.getUser(res.locals.userUid);
        let data = {
            property: user.property,
            details: []
        }
        for (let pid of user.property) {
            data.details.push(await propertyData.getById(pid))
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

        res.json(data)
    } catch (e) {
        res.status(500).json({error: e});
    }
});

router.get('/:uid', async (req, res) => {
    try {
        let uid = req.params.uid;
        if (uid === undefined)  throw "uid is undefinded";
        if (!ObjectId.isValid(uid)) throw "uid is invalid";
        if (typeof id != "string") id = id.toString();
    } catch (e) {
        res.status(400).json({error: e});
        return;
    }
    try {
        const task = await taskData.getById(req.params.id);
        res.json(task);
    } catch (e) {
        res.status(404).json({error: 'task not found'});
    }
});

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

// router.delete('/:taskId/:commentId', async (req, res) => {
//     try {
//         let id = req.params.taskId;
//         if (id === undefined)  throw "taskId is undefinded";
//         if (!ObjectId.isValid(id)) throw "taskId is invalid";
//         if (typeof id != "string") id = id.toString();
//     } catch (e) {
//         res.status(400).json({error: e});
//         return;
//     }

//     try {
//         let id = req.params.commentId;
//         if (id === undefined)  throw "commentId is undefinded";
//         if (!ObjectId.isValid(id)) throw "commentId is invalid";
//         if (typeof id != "string") id = id.toString();
//     } catch (e) {
//         res.status(400).json({error: e});
//         return;
//     }

//     let task;
//     let comment;

//     try {
//         task = await taskData.getById(req.params.taskId);
//     } catch (e) {
//         res.status(404).json({error: "task not found"});
//         return;
//     }

//     try {
//         comment = await commentData.getById(req.params.commentId);
//     } catch (e) {
//         res.status(404).json({error: "comment not found"});
//         return;
//     }

//     if(!task.comments.some(e => e._id == req.params.commentId)) {
//         res.status(400).json({error: "this comment doesn't belong to this task"});
//         return;
//     }
    
//     try {
//         const task = await commentData.delete(req.params.commentId, req.params.taskId);
//         res.json(task);
//     } catch (e) {
//         res.status(500).json({error: e});
//     }
// });

module.exports = router;

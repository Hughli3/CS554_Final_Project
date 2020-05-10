const mongoCollections = require('../config/collections');
const tasks = mongoCollections.tasks;
const ObjectId = require('mongodb').ObjectID;

let exportedMethods = {
    async getAll(skip, take) {
        if (skip === undefined) throw "skip is undefinded";
        skip = parseInt(skip);
        if(isNaN(skip)) throw "skip is not a valid number";
        if (skip < 0 ) throw "skip is not a positive number";

        if (take === undefined) throw "take is undefinded";
        take = parseInt(take);
        if(isNaN(take)) throw "take is not a valid number";
        if (take < 0 ) throw "take is not a positive number";
        if (take > 100 ) throw "take is too large, max is 100";

        const taskCollection = await tasks();
        let allTask = await taskCollection.find({}).toArray();
        if (!allTask) throw 'no tasks in system!';
        
        allTask = allTask.slice(skip);
        allTask = allTask.slice(0, take);

        try {
            // comment
            let commentData = require('./comments');
            
            for (let i = 0; i < allTask.length; i++) {
                let commentList = allTask[i].comments;
                let comments = []
                
                for (let i = 0; i < commentList.length; i++) {
                    comment = await commentData.getById(commentList[i]);
                    comments.push(comment);
                }
                allTask[i].comments = comments;
            }
        } catch (e) {
            throw e;
        }
        return allTask;
    },

    async getById(id) {
        if (id === undefined)  throw "id is undefinded";
        if (!ObjectId.isValid(id)) throw "id is invalid";
        if (typeof id != "string") id = id.toString();
        const objId = ObjectId.createFromHexString(id);

        const taskCollection = await tasks();
        const task = await taskCollection.findOne({ _id: objId });
        if (!task) throw 'task not found';

        try {
            // comment
            let commentData = require('./comments');

            let commentList = task.comments;

            let comments = []
            for (let i = 0; i < commentList.length; i++) {
                comment = await commentData.getById(commentList[i]);
                comments.push(comment);
            }
            task.comments = comments;
        } catch (e) {
            throw e;
        }

        return task;
    },

    async add(title, description, hoursEstimated, completed) {
        if (title === undefined) throw "title is undefinded";
        if (typeof title != "string") throw "title is not a string";
        if (description === undefined) throw "description is undefinded";
        if (typeof description != "string") throw "description is not a string";
        if (hoursEstimated === undefined) throw "hoursEstimated is undefinded";
        if (typeof hoursEstimated != "number") throw "hoursEstimated is not of the proper type";
        if (hoursEstimated <= 0 ) throw "hoursEstimated is not a positive number";
        if (completed === undefined) throw "completed is undefinded";
        if (typeof completed != "boolean") throw "completed is not of the proper type";
        
        const taskCollection = await tasks();
        const newTask = {
            title: title,
            description: description,
            hoursEstimated: hoursEstimated,
            completed: completed,
            comments: []
        };

        const insertInfo = await taskCollection.insertOne(newTask);
        if (insertInfo.insertedCount === 0) throw "could not add task";
        const newId = insertInfo.insertedId;
    
        return await this.getById(newId.toString());
    },

    async update(id, title, description, hoursEstimated, completed) {
        if (id === undefined) throw "id is undefinded";
        if (!ObjectId.isValid(id)) throw "id is invalid";
        if (typeof id != "string") id = id.toString();
        const objId = ObjectId.createFromHexString(id);

        let updatedTask = {};
        if (title !== undefined) {
            if (typeof title != "string") throw "title is not a string";
            updatedTask.title = title;
        }
        if (description !== undefined) {
            if (typeof description != "string") throw "description is not a string";
            updatedTask.description = description;
        }
        if (hoursEstimated !== undefined) {
            if (typeof hoursEstimated != "number") throw "hoursEstimated is not of the proper type";
            if (hoursEstimated <= 0 ) throw "hoursEstimated is not a positive number";
            updatedTask.hoursEstimated = hoursEstimated;
        }
        if (completed !== undefined) {
            if (typeof completed != "boolean") throw "completed is not of the proper type";
            updatedTask.completed = completed;
        }

        const taskCollection = await tasks();
        const updateInfo = await taskCollection.updateOne({ _id: objId }, {$set: updatedTask});
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'update failed';
    
        return await this.getById(id);
    },

    async addCommentToTask(taskId, commentId) {
        if (taskId === undefined) throw "taskId is undefinded";
        if (!ObjectId.isValid(taskId)) throw "taskId is invalid";
        if (commentId === undefined) throw "commentId is undefinded";
        if (!ObjectId.isValid(commentId)) throw "commentId is invalid";

        if (typeof taskId != "string") taskId = taskId.toString();
        if (typeof commentId != "string") commentId = commentId.toString();
        const taskIdObj = ObjectId.createFromHexString(taskId);
        const commentIdObj = ObjectId.createFromHexString(commentId);

        const taskCollection = await tasks();
        const updateInfo = await taskCollection.updateOne(
          {_id: taskIdObj},
          {$addToSet: {comments: commentIdObj}}
        );
    
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'update failed';
    
        return await this.getById(taskId);
    },

    async removeCommentFromTask(taskId, commentId) {
        if (taskId === undefined) throw "taskId is undefinded";
        if (!ObjectId.isValid(taskId)) throw "taskId is invalid";
        if (commentId === undefined) throw "commentId is undefinded";
        if (!ObjectId.isValid(commentId)) throw "commentId is invalid";

        if (typeof taskId != "string") taskId = taskId.toString();
        if (typeof commentId != "string") commentId = commentId.toString();
        const taskIdObj = ObjectId.createFromHexString(taskId);
        const commentIdObj = ObjectId.createFromHexString(commentId);

        const taskCollection = await tasks();
        const updateInfo = await taskCollection.updateOne({_id: taskIdObj}, {$pull: {comments: commentIdObj}});
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'remove comment failed';
    
        return;
    }
};

module.exports = exportedMethods;
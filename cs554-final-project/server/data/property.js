// ==================== Requires ====================
const collections = require("../config/collections");
const properties = collections.property;
const users = collections.users;
const imgData = require("./img");
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
    
        const propertyCollection = await properties();
        let allProperty = await propertyCollection.find({}).toArray();
        if (!allProperty) throw 'no property in system';
        
        allProperty = allProperty.slice(skip);
        allProperty = allProperty.slice(0, take);
    
        // try {
        //     // comment
        //     let commentData = require('./comments');
            
        //     for (let i = 0; i < allTask.length; i++) {
        //         let commentList = allTask[i].comments;
        //         let comments = []
                
        //         for (let i = 0; i < commentList.length; i++) {
        //             comment = await commentData.getById(commentList[i]);
        //             comments.push(comment);
        //         }
        //         allTask[i].comments = comments;
        //     }
        // } catch (e) {
        //     throw e;
        // }

        return allProperty;
    },

    async add(owner, propertyInfo){
        // TODO checker
        // ifOwner(owner);
        // checkPropertyInfo(propertyInfo);
        
        let data = {
            title: propertyInfo.title,
            description: propertyInfo.description,
            price: propertyInfo.price,
            address: propertyInfo.address,
            type: propertyInfo.type,
            bedroom: propertyInfo.bedroom,
            bath: propertyInfo.bath,
            area: propertyInfo.float,
            date: propertyInfo.date,
            album: [],
            owner: owner,
        }

        const propertyCollection = await properties();
        const insertInfo = await propertyCollection.insertOne(data);
        if (insertInfo.insertedCount === 0) throw "could not add property";
        const newId = insertInfo.insertedId;

        return await this.getById(newId.toString());    
    },
    
    async getById(id){
        if (id === undefined)  throw "id is undefinded";
        if (!ObjectId.isValid(id)) throw "id is invalid";
        if (typeof id != "string") id = id.toString();
        const objId = ObjectId.createFromHexString(id);

        const propertyCollection = await properties();
        const property = await propertyCollection.findOne({ _id: objId });
        if (!property) throw 'property not found';

        // try {
        //     // comment
        //     let commentData = require('./comments');

        //     let commentList = task.comments;

        //     let comments = []
        //     for (let i = 0; i < commentList.length; i++) {
        //         comment = await commentData.getById(commentList[i]);
        //         comments.push(comment);
        //     }
        //     task.comments = comments;
        // } catch (e) {
        //     throw e;
        // }

        return property;
    },
    
    // async update(){
    
    // },

    // async delete(propertyId) {
    //     if (commentId === undefined) throw "commentId is undefinded";
    //     if (!ObjectId.isValid(commentId)) throw "commentId is invalid";
    //     if (typeof commentId != "string") commentId = commentId.toString();
    //     const commentIdObj = ObjectId.createFromHexString(commentId);
    
    //     if (taskId === undefined) throw "taskId is undefinded";
    //     if (!ObjectId.isValid(taskId)) throw "taskId is invalid";
    //     if (typeof taskId != "string") taskId = taskId.toString();
    
    //     // make sure author and post both valid
    //     try {
    //       let comment = await this.getById(commentId);
    //       let task = await tasks.getById(taskId);
    //       if(!task.comments.some(e => e._id == commentId)) {
    //         throw "this comment doesn't belong to this task"
    //       }
    //     } catch (e) {
    //       throw e;
    //     }
    
    //     // delete post
    //     const commentCollection = await comments();
    //     const deletionInfo = await commentCollection.deleteOne({ _id: commentIdObj });
    //     if (deletionInfo.deletedCount === 0) throw "could not delete comment with that id";
    
    //     // delete from animal
    //     try {
    //       await tasks.removeCommentFromTask(taskId, commentId);
    //     } catch (e) {
    //       throw e;
    //     }
    
    //     const res = {
    //         deleted: true,
    //         data: comment
    //     }
    
    //     return res;
    // },

    // async addImage(peropertyId, imageId) {
    //     if (taskId === undefined) throw "taskId is undefinded";
    //     if (!ObjectId.isValid(taskId)) throw "taskId is invalid";
    //     if (commentId === undefined) throw "commentId is undefinded";
    //     if (!ObjectId.isValid(commentId)) throw "commentId is invalid";

    //     if (typeof taskId != "string") taskId = taskId.toString();
    //     if (typeof commentId != "string") commentId = commentId.toString();
    //     const taskIdObj = ObjectId.createFromHexString(taskId);
    //     const commentIdObj = ObjectId.createFromHexString(commentId);

    //     const taskCollection = await tasks();
    //     const updateInfo = await taskCollection.updateOne(
    //       {_id: taskIdObj},
    //       {$addToSet: {comments: commentIdObj}}
    //     );
    
    //     if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'update failed';
    
    //     return await this.getById(taskId);
    // },

    // async removeImage(propertyId, imageId) {
    //     if (taskId === undefined) throw "taskId is undefinded";
    //     if (!ObjectId.isValid(taskId)) throw "taskId is invalid";
    //     if (commentId === undefined) throw "commentId is undefinded";
    //     if (!ObjectId.isValid(commentId)) throw "commentId is invalid";

    //     if (typeof taskId != "string") taskId = taskId.toString();
    //     if (typeof commentId != "string") commentId = commentId.toString();
    //     const taskIdObj = ObjectId.createFromHexString(taskId);
    //     const commentIdObj = ObjectId.createFromHexString(commentId);

    //     const taskCollection = await tasks();
    //     const updateInfo = await taskCollection.updateOne({_id: taskIdObj}, {$pull: {comments: commentIdObj}});
    //     if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'remove comment failed';
    
    //     return;
    // }
}




module.exports = exportedMethods;


// ==================== Checker ====================
async function isOwner(owner){
    /*
    check the owner type, check if owner exist in the database
    */

    if (!owner) throw "id is undefinded";
    if (owner.constructor !== String) throw "id is not a string";
    if (!ObjectId.isValid(owner)) throw "id is invalid";
    const usersCollection = await users();
    let parsedOwner = ObjectId.createFromHexString(owner);
    const user = await usersCollection.find({_id:parsedOwner});
    if (user == null) throw `owner with the id ${parsedOwner} is not exist`;
}

function checkPropertyInfo(propertyInfo){
    if(!propertyInfo){
        throw "propertyInfo not exist";
    }

    // ---------------------------------
    if(!propertyInfo.title){
        throw "property title not exist";
    }

    // ---------------------------------
    if(!propertyInfo.type){
        throw "property type not exist";
    }
    if (propertyInfo.type.constructor !== String) throw "type is not a string";
    let types ={} // TODO
    if (!(propertyInfo.type in types)) throw "invalid type";
    // ---------------------------------
    if(!propertyInfo.description){
        throw "property description not exist";
    }

    // ---------------------------------
    if(!propertyInfo.address){
        throw "property address not exist";
    }

    // ---------------------------------
    if(!propertyInfo.price){
        throw "property price not exist";
    }

    // ---------------------------------
    if(!propertyInfo.publishedDate){
        throw "property publishedData not exist";
    }
    
    // ---------------------------------
    if(!propertyInfo.bedroom){
        throw "property bedroom not exist";
    }

    // ---------------------------------
    if(!propertyInfo.baths){
        throw "property baths not exist";
    }

    // ---------------------------------
    if(!propertyInfo.area){
        throw "property area not exist";
    }
    // TODO not finished
}

async function validateOwner(owner){
    if (!owner) throw "owner is undefinded";
    if (owner.constructor !== String) throw "owner is not a string";
  
    const usersCollection = await users();
    let parsedOwner = ObjectId.createFromHexString(owner);
    const user = await usersCollection.find({_id:parsedOwner});
    if (user == null) throw `owner with the id ${parsedOwner} is not exist`;
  }

function validateType(type){
    if (!type) throw "type is undefinded";
    if (type.constructor !== String) throw "type is not a string";

    // TODO specify the types
    let types ={}
    if (!(type in types)) throw "invalid type";
}

function validateName(name){
    if (!name) throw "name is undefinded";
    if (name.constructor !== String) throw "name is not a string";
    if (name.length > 30) throw "length name is greater than 30";
}
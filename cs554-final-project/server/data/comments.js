const mongoCollections = require('./collections');
const comments = mongoCollections.comments;
const tasks = require('./tasks');
const ObjectId = require('mongodb').ObjectID;

const exportedMethods = {
  async getById(id) {
    if (id === undefined)  throw "id is undefinded";
    if (!ObjectId.isValid(id)) throw "id is invalid";
    if (typeof id != "string") id = id.toString();

    const objId = ObjectId.createFromHexString(id);
    
    const commentCollection = await comments();
    const comment = await commentCollection.findOne({ _id: objId });
    if (!comment) throw 'comment not found';

    return comment;
  },

  async add(name, comment, task) {
    if (name === undefined) throw "name is undefinded";
    if (typeof name != "string") throw "name is not a string";
    if (comment === undefined) throw "comment is undefinded";
    if (typeof comment != "string") throw "comment is not a string";
    if (task === undefined) throw "task is undefinded";
    if (!ObjectId.isValid(task)) throw "task is invalid";

    try {
      await tasks.getById(task);
    } catch (e) {
      throw e;
    }

    const newComment = {
      name: name,
      comment: comment
    };

    const commentCollection = await comments(); 
    const insertInfo = await commentCollection.insertOne(newComment);
    if (insertInfo.insertedCount === 0) throw "could not add comment";

    const newId = insertInfo.insertedId;

    try {
      await tasks.addCommentToTask(task, newId);
    } catch (e) {
      throw e;
    }

    return await this.getById(newId);
  },

  async delete(commentId, taskId) {
    if (commentId === undefined) throw "commentId is undefinded";
    if (!ObjectId.isValid(commentId)) throw "commentId is invalid";
    if (typeof commentId != "string") commentId = commentId.toString();
    const commentIdObj = ObjectId.createFromHexString(commentId);

    if (taskId === undefined) throw "taskId is undefinded";
    if (!ObjectId.isValid(taskId)) throw "taskId is invalid";
    if (typeof taskId != "string") taskId = taskId.toString();

    // make sure author and post both valid
    try {
      let comment = await this.getById(commentId);
      let task = await tasks.getById(taskId);
      if(!task.comments.some(e => e._id == commentId)) {
        throw "this comment doesn't belong to this task"
      }
    } catch (e) {
      throw e;
    }

    // delete post
    const commentCollection = await comments();
    const deletionInfo = await commentCollection.deleteOne({ _id: commentIdObj });
    if (deletionInfo.deletedCount === 0) throw "could not delete comment with that id";

    // delete from animal
    try {
      await tasks.removeCommentFromTask(taskId, commentId);
    } catch (e) {
      throw e;
    }

    const res = {
        deleted: true,
        data: comment
    }

    return res;
  }
};

module.exports = exportedMethods;
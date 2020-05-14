//==================== Requires ====================

const collections = require("../config/collections");
const users = collections.user
const properties = collections.property

const imgData = require("../data/img");
// const propertyData = require("../data/property");

//==================== Main ====================
let exportedMethods = {
  async getUser(id){
    const usersCollection = await users();
    const userInfo = await usersCollection.findOne({ _id: id });

    if (userInfo == null) throw "Could not find user successfully";
  
    // TODO Check propertylist and watchList
    // let propertylist = [];
    // for (let property of userInfo.properties) {
    //   propertylist.push(await propertyData.getProperty(property));
    // }
    // userInfo.properties = propertylist;
  
    // let watchList = [];
    // for (let watch of userInfo.watchList) {
    //   watchList.push(await propertyData.getProperty(watch));
    // }
    // userInfo.properties = propertylist;
  
    // if (userInfo.avatar) {
    //   let avatar = await imgData.getPhotoDataId(userInfo.avatar);
    //   userInfo.avatar = avatar;
    // }
    
    return userInfo;
  },

  async add(id, email) {
      let user = {
          _id: id,
          email: email,
          avatar: null,
          watchlist: [],
          property: [],
          phone: ""
      }
      const usersCollection = await users();
      const insertInfo = await usersCollection.insertOne(user);
      if (insertInfo.insertedCount === 0) throw "Could not create a new user";

      return await this.getUser(insertInfo.insertedId);
  },
  
  async addWatchlist(propertyId, userId) {
    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
      {_id: userId},
      {$addToSet: {watchlist: propertyId}}
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'add to watchlist failed';

    return await this.getUser(userId)
  },

  async removeWatchlist(propertyId, userId) {
    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
      {_id: userId},
      {$pull: {watchlist: propertyId}}
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'remove from watchlist failed';

    return await this.getUser(userId)
  },

  // async function updateAvatar(uid, file){
  //     let photoId = await imgData.createGridFS(file);
      
  //     const usersCollection = await users();
  //     let oldUser = await usersCollection.findOne({ uid: uid })
  //     const updateInfo = await usersCollection.updateOne({ uid: uid }, { $set: {avatar: photoId.toString()}});
  //     if (updateInfo.modifiedCount === 0) throw "Could not update user avatar successfully";
    
  //     if(oldUser.avatar !== null)
  //       await imgData.deletePhoto(oldUser.avatar)
    
  //     return await getUser(uid);
  // }  

}

module.exports = exportedMethods;

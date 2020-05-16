//==================== Requires ====================

const collections = require("../config/collections");
const users = collections.user
const properties = collections.property

const imgData = require("./img");
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

  
  async updateUser(id, phone, avatar) {
    // let avatarid = await this.updateAvatar(id, avatar)
    validatePhone(phone);
    let data = {
        phone: phone,
        avatar: null
    }
    const userCollection = await users();

    const updateInfo = await userCollection.updateOne({_id: id}, {$set: data});
    if (updateInfo.modifiedCount === 0) throw "nothing changed";

    return await this.getUser(id); 
  },

  // async updateAvatar(uid, avatar){
  //     let photoId = await imgData.createGridFS(avatar[0], avatar[1], avatar[2]);
      
  //     const userCollection = await users();
  //     let oldUser = await userCollection.findOne({ _id: uid })

  //     if(oldUser.avatar !== null)
  //       await imgData.deletePhoto(oldUser.avatar)
    
  //     return photoId;
  // }  

}

module.exports = exportedMethods;


// ==================== Checker ====================
function validatePhone(phone){
  if (phone && phone.constructor !== String) throw "phone is not a string";
  if (phone && phone.length != 10) throw "phone length is wrong";
}

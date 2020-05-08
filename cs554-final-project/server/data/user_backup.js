//==================== Requires ====================

import collection from "../config/collections"
const users = collection.user
const imgData = require("../data/img");
// const propertyData = require("../data/property");

//================== Validate functions ======================

//==================== Main ====================
async function addUser(uid, email){
    let user = {
        uid: uid,
        email: email,
        avatar: null,
        watchList: [],
        properties: [],
        phone: ""
    }
  
    const usersCollection = await users();
    const insertInfo = await usersCollection.insertOne(user);
    if (insertInfo.insertedCount === 0) throw "Could not create a new user";
    
    return getUser(insertInfo.insertedId.toString());
}
  
async function getUser(uid){
    const usersCollection = await users();
    const userInfo = await usersCollection.findOne({ uid: uid });
    if (userInfo == null) throw "Could not find user successfully";
  
    // TODO Check propertylist and watchList
    let propertylist = [];
    // for (let property of userInfo.properties) {
    //   propertylist.push(await propertyData.getProperty(property));
    // }
    // userInfo.properties = propertylist;
  
    let watchList = [];
    // for (let watch of userInfo.watchList) {
    //   watchList.push(await propertyData.getProperty(watch));
    // }
    userInfo.properties = propertylist;
  
    if (userInfo.avatar) {
      let avatar = await imgData.getPhotoDataId(userInfo.avatar);
      userInfo.avatar = avatar;
    }
    
    return userInfo;
}
  
async function updateAvatar(uid, file){
    let photoId = await imgData.createGridFS(file);
     
    const usersCollection = await users();
    let oldUser = await usersCollection.findOne({ uid: uid })
    const updateInfo = await usersCollection.updateOne({ uid: uid }, { $set: {avatar: photoId.toString()}});
    if (updateInfo.modifiedCount === 0) throw "Could not update user avatar successfully";
  
    if(oldUser.avatar !== null)
      await imgData.deletePhoto(oldUser.avatar)
  
    return await getUser(uid);
}  

export default {
  addUser,
  getUser,
  updateAvatar,
}
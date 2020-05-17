//==================== Requires ====================
const collections = require("../config/collections");
const users = collections.user

//==================== Main ====================
let exportedMethods = {
  async getUser(id){

    const usersCollection = await users();
    const userInfo = await usersCollection.findOne({ _id: id });
    if (userInfo == null) throw "Could not find user successfully";
    
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
      {_id: userId, watchlist: { $ne: propertyId } },
      {$push: { watchlist: { $each: [propertyId], $position: 0 } }}
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
    validatePhone(phone);
    let data = {
      phone: phone
    }
    if (avatar) {
      data.avatar = avatar
    }
    const userCollection = await users();

    const updateInfo = await userCollection.updateOne({_id: id}, {$set: data});
    if (updateInfo.modifiedCount === 0) throw "nothing changed";

    return await this.getUser(id); 
  },

}

module.exports = exportedMethods;


// ==================== Checker ====================
function validatePhone(phone){
  if (phone && phone.constructor !== String) throw "phone is not a string";
  if (phone && phone.length != 10) throw "phone length is wrong";
}

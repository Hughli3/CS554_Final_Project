// //========================================
// // Requires
// const mongoCollections = require("../config/mongoCollections");
// const users = mongoCollections.users;
// const ObjectId = require('mongodb').ObjectID;
// const imgData = require("../data/img");
// const dogData = require("../data/dogs");
// const bcryptjs = require("bcryptjs");
// const saltRounds = 5;

// //========================================
// // Validate functions
// function validateId(id){
//   if (!id) throw "id is undefinded";
//   if (id.constructor !== String) throw "id is not a string";
//   if (!ObjectId.isValid(id)) throw "id is invalid";
// }

// function validateUsername(username){
//   if (!username) throw "username is undefinded";
//   if (username.constructor !== String) throw "username is not of the proper type";
//   if (username.length < 6 ) throw "length of username is less than 6";
//   let letterNumber = /^[0-9a-zA-Z]+$/;
//   if (!username.match(letterNumber)) throw "username should contain only letter and number";
// }

// function validatePassword(password){
//   if (!password) throw "password is undefinded";
//   if (password.constructor !== String) throw "password is not of the proper type";
//   if (password.length < 8 ) throw "length of password is less than 8";
//   if (password.length > 31 ) throw "length of password is greater than 31";
// }

// //========================================
// async function addUser(username, password){
//   validateUsername(username);
//   validatePassword(password);

//   const usersCollection = await users();
//   username = username.toLowerCase();
//   const findUser = await usersCollection.findOne({ username: username });
//   if (findUser) throw "username has been used by other users";

//   const bcryptjsPassword = await bcryptjs.hash(password, saltRounds);
//   let user = {
//       username: username.toLowerCase(),
//       password: bcryptjsPassword,
//       avatar: null,
//       dogs: []}

//   const insertInfo = await usersCollection.insertOne(user);
//   if (insertInfo.insertedCount === 0) throw "Could not create a new user";
  
//   return getUser(insertInfo.insertedId.toString());
// }

// async function getUser(id){
//   validateId(id);

//   const usersCollection = await users();
//   const parsedId = ObjectId.createFromHexString(id);
//   const userInfo = await usersCollection.findOne({ _id: parsedId });
//   if (userInfo == null) throw "Could not find user successfully";

//   let dogslist = [];
//   for (let dog of userInfo.dogs) {
//     dogslist.push(await dogData.getDog(dog));
//   }
//   userInfo.dogs = dogslist;

//   if (userInfo.avatar) {
//     let avatar = await imgData.getPhotoDataId(userInfo.avatar);
//     userInfo.avatar = avatar;
//   }
  
//   return userInfo;
// }

// async function getUserByUsername(username){
//   validateUsername(username);

//   const usersCollection = await users();
//   const userInfo = await usersCollection.findOne({ username: username });
//   if (userInfo == null) throw "Could not find user successfully";

//   let dogslist = [];
//   for (let dog of userInfo.dogs) {
//     dogslist.push(await dogData.getDog(dog));
//   }
//   userInfo.dogs = dogslist;

//   if (userInfo.avatar) {
//     let avatar = await imgData.getPhotoDataId(userInfo.avatar);
//     userInfo.avatar = avatar;
//   }
  
//   return userInfo;
// }

// async function changePassword(id, newPassword){
//   validateId(id);  
//   validatePassword(newPassword);
  
//   const parsedId = ObjectId.createFromHexString(id);
//   const newbcryptjsPassword = await bcryptjs.hash(newPassword, saltRounds);
//   const usersCollection = await users();

//   const updateUserPassword = {
//       password: newbcryptjsPassword
//     };
//   const originalData = await usersCollection.findOne({ _id: parsedId });
//   if (originalData.password === newbcryptjsPassword){
//     throw `You have to input a different password.`;
//   }

//   const updateInfo = await usersCollection.updateOne({ _id: parsedId }, { $set: updateUserPassword});

//   if (updateInfo.modifiedCount === 0) {
//       throw "Could not update user password successfully";
//     }

//   return await getUser(id);
// }

// async function updateAvatar(id, file){
//   validateId(id);

//   let photoId = await imgData.createGridFS(file);
   
//   const usersCollection = await users();
//   const parsedId = ObjectId.createFromHexString(id);
//   let oldUser = await usersCollection.findOne({ _id: parsedId })
//   const updateInfo = await usersCollection.updateOne({ _id: parsedId }, { $set: {avatar: photoId.toString()}});
//   if (updateInfo.modifiedCount === 0) throw "Could not update user avatar successfully";

//   if(oldUser.avatar !== null)
//     await imgData.deletePhoto(oldUser.avatar)

//   return await getUser(id);
// }

// async function comparePassword(username, password) {
//   validateUsername(username);
//   validatePassword(password);

//   const usersCollection = await users();
//   username = username.toLowerCase();
//   const userInfo = await usersCollection.findOne({username:username});
//   if (!userInfo) throw 'invalid username/password';

//   const isCorrect = await bcryptjs.compare(password, userInfo.password);
//   if (!isCorrect) throw 'invalid username/password';

//   return {userid: userInfo._id, username: userInfo.username};
// }

// module.exports = {
//     addUser,
//     getUser,
//     updateAvatar,
//     changePassword,
//     comparePassword,
//     getUserByUsername,
//   }
  
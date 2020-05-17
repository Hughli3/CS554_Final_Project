// ==================== Requires ====================
const collections = require("../config/collections");
const properties = collections.property;
const users = collections.user;
const imgData = require("./img");
const ObjectId = require('mongodb').ObjectID;
const xss = require("xss");

let exportedMethods = {

    async getAll(page, filter, sort) {
        if (page === undefined) throw "page is undefinded";
        page = parseInt(page);
        if(isNaN(page)) throw "page is not a valid number";
        if (page < 1 ) throw "page is not a positive number";
        
        let take = 8;
        if (sort && sort === "priceUp"){
            sort = {price:1};
        }else if (sort && sort === "priceDown"){
            sort = {price:-1};
        }else{
            sort = {};
        }
        
        let date = new Date()
        if(filter && filter === "3days"){
            let filterDate = Date.parse(date) - 3*24*60*60*1000;
            filter = {date: {$gt:filterDate}};
        }else if (filter && filter === "10days"){
            let filterDate = Date.parse(date) - 10*24*60*60*1000;
            filter = {date: {$gt:filterDate}};
        }else if (filter && filter === "30days"){
            let filterDate = Date.parse(date) - 30*24*60*60*1000;
            filter = {date: {$gt:filterDate}};
        }else if(filter && filter === "price1"){
            filter = {price: {$lt:1000}};
        }else if (filter && filter === "price2"){
            filter = {price: {$lt:2000, $gte:1000}};
        }else if (filter && filter === "price3"){
            filter = {price: {$gte:3000}};
        }else{
            filter = {}
        }

        sort.date = -1;
        console.log(sort);
        const propertyCollection = await properties();
        let allProperty = await propertyCollection.find(filter).sort(sort).toArray();
        if (!allProperty) throw 'no property in system';

        let data = {
            properties: null,
            next: false,
            prev: false,
        }
        if (allProperty.length - page * take > 0) {
            data.next = true
        }

        if (allProperty.length > take && page > 1) {
            data.prev = true
        }

        allProperty = allProperty.slice((page - 1) * take);
        allProperty = allProperty.slice(0, take);
        data.properties = allProperty

        return data;
    },

    async add(owner, propertyInfo){
        isOwner(owner);
        checkPropertyInfo(propertyInfo);
        let data = {
            title: xss(propertyInfo.title),
            description: xss(propertyInfo.description),
            price: propertyInfo.price,
            zipcode: propertyInfo.zipcode,
            type: propertyInfo.type,
            bedroom: propertyInfo.bedroom,
            bath: propertyInfo.bath,
            area: propertyInfo.float,
            date: propertyInfo.date,
            album: propertyInfo.album ? propertyInfo.album : [],
            owner: owner,
        }

        const propertyCollection = await properties();
        const insertInfo = await propertyCollection.insertOne(data);
        if (insertInfo.insertedCount === 0) throw "could not add property";
        const newId = insertInfo.insertedId;

        const userCollection = await users();
        const updateInfo = await userCollection.updateOne(
          {_id: owner},
          {$addToSet: {property: newId}}
        );
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'add to user info failed';

        return await this.getById(newId.toString());    
    },
    
    async getById(id){
        if (id === undefined)  throw "id is undefinded";
        if (!ObjectId.isValid(id)) throw "id is invalid 2";
        if (typeof id != "string") id = id.toString();
        const objId = ObjectId.createFromHexString(id);

        const propertyCollection = await properties();
        const property = await propertyCollection.findOne({ _id: objId });
        if (!property) throw 'property not found';

        return property;
    },
    
    async update(id, propertyInfo){
        if (id === undefined)  throw "id is undefinded";
        if (!ObjectId.isValid(id)) throw "id is invalid";
        if (typeof id != "string") id = id.toString();
        const objId = ObjectId.createFromHexString(id);
        if (!propertyInfo) throw 'property not found';
        checkPropertyInfo(propertyInfo);
        
        let data = {
            title: xss(propertyInfo.title),
            description: xss(propertyInfo.description),
            zipcode: propertyInfo.zipcode,
            bedroom: propertyInfo.bedroom,
            bath: propertyInfo.bath,
            price:propertyInfo.price,
            type:propertyInfo.type,
            date: propertyInfo.date,
            album: propertyInfo.album
        }

        const propertyCollection = await properties();

        const updateInfo = await propertyCollection.updateOne({_id: objId}, {$set: data});
        if (updateInfo.modifiedCount === 0) throw "nothing changed";

        return await this.getById(id.toString()); 
    },

    async delete(id, ownerId) {
        if (id === undefined) throw "property id is undefinded";
        if (!ObjectId.isValid(id)) throw "property id is invalid";
        if (typeof id != "string") id = id.toString();
        const idObj = ObjectId.createFromHexString(id);
    
        // delete property
        const propertyCollection = await properties();
        const deletionInfo = await propertyCollection.deleteOne({ _id: idObj });
        if (deletionInfo.deletedCount === 0) throw "could not delete comment with that id";
    
        // delete from watchlist
        const userCollection = await users();
        await userCollection.updateMany({}, {$pull: {watchlist: id}});

        // delete from owner's property list
        const updateInfo = await userCollection.updateOne(
          {_id: ownerId},
          {$pull: {property: idObj}}
        );
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'remove from owner failed';

        const res = {
            deleted: true
        }
    
        return res;
    },

    async addImage(propertyId, imageId) {
        if (propertyId === undefined) throw "propertyId is undefinded";
        if (!ObjectId.isValid(propertyId)) throw "propertyId is invalid";
        if (imageId === undefined) throw "imageId is undefinded";
        if (!ObjectId.isValid(imageId)) throw "imageId is invalid";

        if (typeof propertyId != "string") propertyId = propertyId.toString();
        if (typeof imageId != "string") imageId = imageId.toString();
        const propertyIdObj = ObjectId.createFromHexString(propertyId);
        const imageIdObj = ObjectId.createFromHexString(imageId);

        const propertyCollection = await properties();
        const updateInfo = await propertyCollection.updateOne(
          {_id: propertyIdObj},
          {$addToSet: {album: imageIdObj}}
        );
    
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'update failed';
    
        return await this.getById(propertyId);
    },

    async removeImage(propertyId, imageId) {
        if (propertyId === undefined) throw "propertyId is undefinded";
        if (!ObjectId.isValid(propertyId)) throw "propertyId is invalid";
        if (imageId === undefined) throw "imageId is undefinded";
        if (!ObjectId.isValid(imageId)) throw "imageId is invalid";

        if (typeof propertyId != "string") propertyId = propertyId.toString();
        if (typeof imageId != "string") imageId = imageId.toString();
        const propertyIdObj = ObjectId.createFromHexString(propertyId);
        const imageIdObj = ObjectId.createFromHexString(imageId);

        const propertyCollection = await properties();
        const updateInfo = await propertyCollection.updateOne(
            {_id: propertyIdObj}, 
            {$pull: {album: imageIdObj}}
        );
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'remove comment failed';
    
        return await this.getById(propertyId);
    },

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
    if (propertyInfo.title.constructor !== String) throw "title is not a string";
    if (propertyInfo.title.length > 70) throw "title length is greater than 70";

    // ---------------------------------
    if(!propertyInfo.type){
        throw "property type not exist";
    }
    if (propertyInfo.type.constructor !== String) throw "type is not a string";
    if (!(propertyInfo.type === "apartment" || propertyInfo.type === "house")) throw "invalid type"
    // ---------------------------------
    if(!propertyInfo.description){
        throw "property description not exist";
    }
    if (propertyInfo.description.constructor !== String) throw "title is not a string";
    if (propertyInfo.description.length > 200) throw "title length is greater than 200";
    // ---------------------------------
    if(!propertyInfo.price){
        throw "property price not exist";
    }
    if (propertyInfo.price.constructor !== Number) throw "price is not a number";
    if (propertyInfo.price < 0) throw "price is invalid"
    // ---------------------------------
    if(!propertyInfo.date){
        throw "property published date not exist";
    }
    
    // ---------------------------------
    if(!propertyInfo.bedroom){
        throw "property bedroom not exist";
    }
    if(propertyInfo.bedroom.constructor != Number) throw "bedroom is not a number";
    if (propertyInfo.bedroom < 0) throw "bedroom is invalid"
    // ---------------------------------
    if(!propertyInfo.bath){
        throw "property baths not exist";
    }
    if(propertyInfo.bath.constructor != Number) throw "bath is not a number";
    if (propertyInfo.bath < 0) throw "bath is invalid"

    // TODO Add date checker
    let today = new Date()
    if (propertyInfo.date > Date.parse(today)) throw "Date invalid";
}


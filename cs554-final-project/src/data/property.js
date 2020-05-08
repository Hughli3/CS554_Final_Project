// ==================== Requires ====================
const mongoCollections = require("../config/mongoCollections");
const property = mongoCollections.property;
const users = mongoCollections.users;
const imgData = require("./img");
const ObjectId = require('mongodb').ObjectID;


// ==================== Checker ====================
async function ifOwner(owner){
    /*
    check the owner type, check if owner exist in the database
    */

    if (!owner) throw "id is undefinded";
    if (owner.constructor !== String) throw "id is not a string";
    if (!ObjectId.isValid(owner)) throw "id is invalid";
    const usersCollection = await users();
    let parsedOwner = ObjectId.createFromHexString(owner);
    const user = await usersCollection.find({_id:parsedOwner});
    if (user == null) thorw `owner with the id ${parsedOwner} is not exist`;
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
    parsedOwner = ObjectId.createFromHexString(owner);
    const user = await usersCollection.find({_id:parsedOwner});
    if (user == null) thorw `owner with the id ${parsedOwner} is not exist`;
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



//==================== Main ====================

async function createProperty(owner, propertyInfo){
    
    // TODO checker
    ifOwner(owner);
    checkPropertyInfo(propertyInfo);
    
    let propertyInfo = {
        owner: owner,
        title:propertyInfo.title,
        type:propertyInfo.type,
        description:propertyInfo.description,
        address:propertyInfo.address,
        price:propertyInfo.price,
        publishedDate:propertyInfo.publishedDate,
        album:[],
        bedroom:propertyInfo.bedroom,
        bashs:propertyInfo.baths,
        area:propertyInfo.float
    }
    const propertyCollection = await property();
    const property = await propertyCollection.insertOne(propertyInfo);
    if (property.insertedCount === 0) throw "Could not create a new property";

    return property
}

async function getProperty(){

}

async function deleteProperty(){

}

async function updateProperty(){

}


module.exports={
    createProperty,
    getProperty,
    deleteProperty,
    updateProperty
}
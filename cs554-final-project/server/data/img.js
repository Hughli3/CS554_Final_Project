const base64Img = require('base64-img');
const now = new Date();
const md5 = require('md5');
const ObjectID = require("mongodb").ObjectID;

const collections = require("../config/collections");
const fsFiles = collections.fsFiles;
const fsChunks = collections.fsChunks;
const fs = require('fs');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const resizeImg = require('resize-img');
var sizeOf = require('image-size');
const FileType = require('file-type');

//========================================
// Validate functions
async function validateImage(filePath) {
  let stream = fs.createReadStream(filePath);
  let mimetype = await FileType.fromStream(stream);

  if(!filePath) throw "image is undefinded";
  const imageType = new Set(['jpg', 'jpeg','png']);
  const fileType = mimetype.mime.split("/");
  
  if(fileType[0] != "image" || ! imageType.has(fileType[1]) ) {
    fs.unlinkSync(filePath);
    throw "file is not in proper type image, jpg jpeg png are accepted";
  }

  let base64Data = base64Img.base64Sync(filePath);
  if (base64Data.length > 16777216) {
    fs.unlinkSync(filePath);
    throw "size is larger than 16MB";
  }

  return mimetype.mime
}

function validateBase64(base64Str) {
  // let reg = /^data:image\/[A-Za-z]+;base64,([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{0,3}==)$/
  let reg = /^data:image\/[A-Za-z]+;base64,[A-Za-z0-9+/]*[=]{0,2}$/
  if(!reg.test(base64Str)){
    throw "it is not Base64 for image";
  }
}

//========================================
// Body functions
function chunkSubstr(str) {
  let size = 261120
  const numChunks = Math.ceil(str.length / size)
  const chunks = new Array(numChunks)

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
      chunks[i] = str.substr(o, size)
  }

  return chunks
}

async function createGridFS(fileName, fieldName, filePath){
  let mimetype = await validateImage(filePath);

  // read file
  let imageRaw = fs.readFileSync(filePath);
  // resize
  var dimensions = sizeOf(imageRaw);
  let image;
  if (fieldName == "avatar")
    image = await resizeImg(imageRaw, {width: 400});
  else if (dimensions.width > 2000)
    image = await resizeImg(imageRaw, {width: 2000});
  else if (dimensions.height > 2000)
    image = await resizeImg(imageRaw, {height: 2000});
  else
    image = imageRaw;
  // compress
  const buf = await imagemin.buffer(image, { plugins: [
          imageminMozjpeg({quality: 70}),
          imageminPngquant({quality: [0.6, 0.8]})]}
  );
  // write back
  if(filePath.includes("./public/img/")){
    fs.writeFileSync(filePath, buf);
  }

  const fsFilesCollection = await fsFiles();
  const fsChunksCollection = await fsChunks();

  let base64Data = base64Img.base64Sync(filePath);
  let newFiles = {
    length: base64Data.length,
    chunkSize: 261120,
    uploadDate: now,
    filename: fileName,
    md5: md5(base64Data),
    contentType: mimetype,
  }

  const insertFilesInfo = await fsFilesCollection.insertOne(newFiles);  
  if (insertFilesInfo.insertedCount === 0){
    if(filePath.includes("./public/img/")){
      fs.unlinkSync(filePath);
    }
    throw "could not create a new file";
  }
  
  let chunks = chunkSubstr(base64Data);
  for (let i = 0; i < chunks.length; i++) {
    let buff = Buffer.from(chunks[i]);
    let newChunk = {
      files_id: insertFilesInfo.insertedId,
      n: i,
      data: buff,
    }

    let insertChunksInfo = await fsChunksCollection.insertOne(newChunk);
    if (insertChunksInfo.insertedCount === 0){
      deletePhoto(fileName)      
      throw "Could not create a new Chunks";
    }    
  }

  if(filePath.includes("./public/img/")){
    fs.unlinkSync(filePath);
  }
  return insertFilesInfo.insertedId;
}

async function deletePhoto(id){
  if (!id) throw "Your input is not exist.";
  let nid = ObjectID(id)

  const fsFilesCollection = await fsFiles();
  const fsChunksCollection = await fsChunks();
  
  const deletionInfo1 = await fsFilesCollection.deleteOne({ _id: nid });
  const deletionInfo2 = await fsChunksCollection.deleteMany({ files_id: nid });

  if (deletionInfo1.deletedCount === 0 && deletionInfo2.deletedCount === 0)
      throw "could not delete photo";

  return true;
}

async function getPhotoDataId(id){
  if (!id) throw "Your input is not exist.";
  let nid = ObjectID(id);

  const fsChunksCollection = await fsChunks();

  const PhotoData = await fsChunksCollection.find({ files_id: nid }).toArray();
  if (PhotoData == null) {
        throw "Could not find Photo Data successfully";
  }

  let stringPhotoData = ''
  for (let i = 0; i < PhotoData.length; i++) {
    for(let j=0; j < PhotoData.length; j++){
      if (PhotoData[j].n == i) {
        stringPhotoData += PhotoData[i].data.buffer.toString()
        break
      }
    }
  }
  return stringPhotoData
}

module.exports = {
  validateBase64,
  createGridFS,
  deletePhoto,
  getPhotoDataId,
}

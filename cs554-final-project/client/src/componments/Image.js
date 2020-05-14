import React, { Component } from 'react';
import serverController from '../serverController';
import Dropzone from 'react-dropzone'

const Image = (props) => {

  const reader = new FileReader();

  reader.onload = (event) => {
    let ff = {}
    ff[file.name] = event.target.result
    files.push(ff)   
    
    filesO[file.name] = event.target.result
  };

	const onDrop = async(acceptedFiles) => {
    console.log(acceptedFiles);

    let files = []
    let filesO = {}

    acceptedFiles.map((file, index) => {
      reader.readAsDataURL(file);
    });

    console.log(filesO)
    console.log(files);
    // console.log(files.length);

    // let filesO1 = filesO;


    console.log("aa"+JSON.stringify(files))
    let data = {}
    data.photo = files

    console.log(data);
    

    
    // const {data: resData} = await serverController.addImage(data);
  }



    return (
      <div className="text-center mt-5">
        <Dropzone 
          onDrop={this.onDrop}
          accept="image/jpeg, image/png"
          minSize={0}
          maxSize={maxSize}
        >
          {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {!isDragActive && 'Click here or drop a file to upload!'}
              {isDragActive && !isDragReject && "Drop it like it's hot!"}
              {isDragReject && "File type not accepted, sorry!"}
            </div>
          )}
        </Dropzone>
      </div>
    );
};

export default Image;

import React, {useContext, useState, useCallback} from 'react';
import { AuthContext } from "../auth/Auth";
import serverController from '../../serverController';
import { Redirect } from "react-router";
import { useAlert } from 'react-alert'
import ReactTooltip from "react-tooltip";
import {useDropzone} from 'react-dropzone'

const AddProperty = (props) => {
    const alert = useAlert()
    const { currentUser } = useContext(AuthContext);
    const [imageData, setImageData] = useState([]);
        
    const getbase64 = async(file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => resolve([file.name, "fieldName",event.target.result]);
            reader.onerror = reject
        })
    }

    const getData = async (Files) => {
        return Promise.all(Files.map(file => getbase64(file)))
    }

    const onDrop = useCallback(async(acceptedFiles, rejectedFiles) => {
        for (let file of rejectedFiles) {
          for (let error of file.errors) {
            console.log(file.file.name + " : " + error.message)
          }
        }

        let files = await getData(acceptedFiles);
        // set state: add to previous state
        setImageData(prevState => {
          let array = prevState.concat(files)
          // remove duplicate
          let set = new Set()
          for (let i = array.length - 1; i >= 0 ; i--) {
            if (set.has(array[i][2])){
              array.splice(i, 1);
            } else {
              set.add(array[i][2])
            }
          }
          return array
        })
    }, [])

    const removeImage = (idx) => {
      console.log(idx)
      setImageData(prevState => {
        let array = [...prevState]
        array.splice(idx, 1);
        return array;
      })
    }

    let preview = imageData && imageData.length > 0 && imageData.map((key, idx) => {
      return (
        <div className="col-3">
          <div className="img-preview-container avatar-container">
            <img class="img-fluid img-preview" src={key[2]} alt={key[0]} />
            <button type="button" onClick={() => removeImage(idx)} data-idx={idx} class="btn btn-danger btn-sm btn-round btn-shadow btn-delete-preview position-absolute">delete</button>
          </div>
        </div>
      ) || null;
    });

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png',
        minSize: 0,
        maxSize: 5242880,
    })

    const uploadImage = (
      <>
        <label htmlFor="album">Album</label>
        <div {...getRootProps()} class="image-upload property-card property-add align-self-center d-flex align-items-center justify-content-center mb-3">
          <input id="album" {...getInputProps()} />
          <div>
            <p><i class="fas fa-file-image"></i></p>
            <p>Click here or drop to upload photos!</p>
          </div>
        </div>
      </>
    );

    const addProperty = async (event) => {
      event.preventDefault();
      const data = event.target.elements;

      let time = new Date()
      data.date = Date.parse(time);
      
      try {
        // TODO move these checker into function
        if (!data.title.value) throw "title not exist"
        if (data.title.value.length > 70) throw "title too long";
        if(!data.description.value) throw "description not exist";
        if (data.description.value.length > 200) throw "description too long";
        if (!data.bedroom.value) throw "bedroom not exist"
        if (parseInt(data.bedroom.value) < 1 || parseInt(data.bedroom.value) > 10 ) throw "bedroom number invalid";
        if (!data.bath.value) throw "bath not exist"

        if (parseInt(data.bath.value) < 0|| parseInt(data.bath.value) > 10) throw "bath number invalid";
        if (!data.price.value) throw "price not exist"
        if (parseInt(data.price.value) < 0) throw "price invalid";
        if (!data.zipcode.value) throw "zipcode not exist";
        if (data.zipcode.value.length != 5) throw "zipcode invalid";
        if (!data.type.value) throw "type is not exist";
        if (data.type.value != "apartment" && data.type.value != "house" ) throw "type is invalid";
        // console.log(data);
        await serverController.postProperty(currentUser, data);

        props.history.push("/account")
        alert.success('post sucessfully')
      } catch (error) {
        alert.error(error)
      }
    };

    // if (isSuccess) {
    //     return <Redirect to="/account" />;
    // }
      
    return (
    <div>
        <h1>Post Property</h1>
        <form onSubmit={addProperty}>
          <div className="row">

            <div class="col-md-12">
              <div class="form-group">
                <label htmlFor="title">Title</label>
                <input class="form-control" id="title" name="title" placeholder="title" data-tip="title length must less than 70"/>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <label htmlFor="description">Description</label>
                <textarea id="description" rows="10" class="form-control" name="description" type="text" placeholder="description" data-tip="description length need to less than 200" />
              </div>
            </div>

            <div class="col-md-12">
              {uploadImage}
              {preview ?  <div className="row mb-2">{preview}</div> : null}
            </div>

            <div class="col-md-12">
                <label>Type</label>
                <div>
                  <div class="custom-control col-3 custom-radio mb-3">
                    <input name="type" value="apartment" class="custom-control-input" id="type-apartment" type="radio" />
                    <label class="custom-control-label" for="type-apartment">Apartment</label>
                  </div>
                  <div class="custom-control col-3 custom-radio mb-3">
                    <input name="type" value="house" class="custom-control-input" id="type-house" type="radio"/>
                    <label class="custom-control-label" for="type-house">House</label>
                  </div>
                </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <label htmlFor="price">Price</label>
                <input class="form-control" name="price" id="price" placeholder="price" type="number" data-tip="price need to greater than 0"/>
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <label htmlFor="zipcode">Zipcode</label>
                <input class="form-control" id="zipcode" name="zipcode" type="text" placeholder="07030" data-tip="length must equal to 5"/>
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <label htmlFor="bedroom">Bedroom</label>
                <input class="form-control" id="bedroom" name="bedroom" type="number" placeholder="3" data-tip="bedroom need to greater than 0 and less than 10"/>
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <label htmlFor="bath">Bath</label>
                <input class="form-control" id="bath" name="bath" type="number" placeholder="1" />
              </div>
            </div>
          </div>

          <button className="btn btn-primary" type="submit">Post</button>
        </form>
        <ReactTooltip />
    </div>
    );
}

export default AddProperty;
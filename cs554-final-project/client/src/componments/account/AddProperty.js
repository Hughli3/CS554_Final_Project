import React, {useContext, useState, useCallback} from 'react';
import { AuthContext } from "../auth/Auth";
import serverController from '../../serverController';
// import { Redirect } from "react-router";
import { useAlert } from 'react-alert'
import ReactTooltip from "react-tooltip";
import {useDropzone} from 'react-dropzone'

const AddProperty = (props) => {
    const alert = useAlert()
    const { currentUser } = useContext(AuthContext);
    const [imageData, setImageData] = useState([]);
    const [ loading, setLoading ] = useState(false);

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
            alert.error(file.file.name + " : " + error.message)
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

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png',
        minSize: 0,
        maxSize: 5242880,
    })

    let preview = imageData && imageData.length > 0 && imageData.map((key, idx) => {
      return (
        <div className="col-3 mb-2">
          <div className="img-preview-container avatar-container">
            <img class="img-fluid img-preview" src={key[2]} alt={key[0]} />
            <button type="button" onClick={() => removeImage(idx)} data-idx={idx} class="btn btn-danger btn-sm btn-round btn-shadow btn-delete-preview position-absolute">delete</button>
          </div>
        </div>
      ) || null;
    });

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
      setLoading(true)
      event.preventDefault();

      let eventInfo = event.target.elements
      
      let data = {
          title: eventInfo.title.value,
          description: eventInfo.description.value,
          bedroom: eventInfo.bedroom.value,
          bath: eventInfo.bath.value,
          price: eventInfo.price.value,
          zipcode: eventInfo.zipcode.value,
          type: eventInfo.type.value,
      }

      let time = new Date()
      data.date = Date.parse(time);
      console.log(data.album)
      data.album = imageData;
      
      try {
        // TODO move these checker into function
        if (!data.title) throw "title not exist"
        if (data.title.length > 70) throw "title too long";
        if(!data.description) throw "description not exist";
        if (data.description.length > 200) throw "description too long";
        if (!data.bedroom) throw "bedroom not exist"
        if (parseInt(data.bedroom) < 1 || parseInt(data.bedroom) > 10 ) throw "bedroom number invalid";
        if (!data.bath) throw "bath not exist"

        if (parseInt(data.bath) < 0|| parseInt(data.bath) > 10) throw "bath number invalid";
        if (!data.price) throw "price not exist"
        if (parseInt(data.price) < 0) throw "price invalid";
        if (!data.zipcode) throw "zipcode not exist";
        if (data.zipcode.length != 5) throw "zipcode invalid";
        if (!data.type) throw "type is not exist";
        if (data.type != "apartment" && data.type != "house" ) throw "type is invalid";
        // console.log(data);
        await serverController.postProperty(currentUser, data);

        props.history.push("/account")
        setLoading(false)
        alert.success('post sucessfully')
      } catch (error) {
        setLoading(false)
        alert.error(error)
      }
    };

    if (loading) {
      return (
          <div class="lds-facebook"><div></div><div></div><div></div></div>
      )
    }
      
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
import React, {useContext, useState, useEffect, useCallback, useRef} from 'react';
import { AuthContext } from "../auth/Auth";
import serverController from '../../serverController';
import {useDropzone} from 'react-dropzone'
import { useAlert } from 'react-alert'
import ReactTooltip from "react-tooltip";
import { Helmet } from 'react-helmet-async';

const EditProperty = (props) => {
	const alert = useRef(useAlert());

  const [ propertyData, setPropertyData ] = useState();
  const [ loading, setLoading ] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const [imageData, setImageData] = useState([]);
  const [removedImage, setRemovedImage] = useState([]);

	useEffect(
		() => {
			async function getPropertyData() {
				try {
          setLoading(true);
          const {data: property}  = await serverController.getProperty(props.match.params.id)
          setPropertyData(property);
          setLoading(false);
				} catch (e) {
          setLoading(false);
					alert.current.error(e.message)
				}
      }
      getPropertyData();
		},
		[ props.match.params.id ]
    );
    
    const getbase64 = async(file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => resolve([file.name, "fieldName",event.target.result]);
            reader.onerror = reject
        })
    }



    const onDrop = useCallback(async(acceptedFiles, rejectedFiles) => {
        const getData = async (Files) => {
          return Promise.all(Files.map(file => getbase64(file)))
        }
    
        for (let file of rejectedFiles) {
          for (let error of file.errors) {
            alert.current.error(file.file.name + " : " + error.message)
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
        setImageData(prevState => {
            let array = [...prevState]
            array.splice(idx, 1);
            return array;
        })
    }

    const removeExistingImage = (image) => {
        setPropertyData(prevState => {
            let data = {...prevState}
            let album = data.album
            var index = album.indexOf(image);
            if (index > -1) {
                album.splice(index, 1);
            }
            data.album = album;
            return data;
        })
        setRemovedImage(prevState => {
            let array = [...prevState]
            array.push(image);
            return array;
        })
    }

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png',
        minSize: 0,
        maxSize: 5242880,
    })

    let existing_preview = propertyData && propertyData.album && propertyData.album.length > 0 && propertyData.album.map((image, idx) => {
        return (
          <div className="col-3 mb-2">
            <div className="img-preview-container avatar-container">
              <img className="img-fluid img-preview" src={image} alt="property" />
              <button type="button" onClick={() => removeExistingImage(image)} className="btn btn-danger btn-sm btn-round btn-shadow btn-delete-preview position-absolute">delete</button>
            </div>
          </div>
        ) || null;
    });

    let preview = imageData && imageData.length > 0 && imageData.map((key, idx) => {
      return (
        <div className="col-3 mb-2">
          <div className="img-preview-container avatar-container">
            <img className="img-fluid img-preview" src={key[2]} alt={key[0]} />
            <button type="button" onClick={() => removeImage(idx)} data-idx={idx} className="btn btn-danger btn-sm btn-round btn-shadow btn-delete-preview position-absolute">delete</button>
          </div>
        </div>
      ) || null;
    });

    const uploadImage = (
      <>
        <label htmlFor="album">Album</label>
        <div {...getRootProps()} className="image-upload property-card property-add align-self-center d-flex align-items-center justify-content-center mb-3">
          <input id="album" {...getInputProps()} />
          <div>
            <p><i className="fas fa-file-image"></i></p>
            <p>Click here or drop to upload photos!</p>
          </div>
        </div>
      </>
    );

    const editProperty = async (event) => {
        setLoading(true)
        event.preventDefault();

        try{
            const data = event.target.elements;

            let time = new Date();
            data.date = Date.parse(time);

            data.newImages = imageData;
            data.removedImages = removedImage;

            if (!data.title.value) throw Object.assign(new Error("title not exist"),{ code: null });
            if (data.title.value.length > 70) throw Object.assign(new Error("title too long"),{ code: null });
            if (!data.description.value) throw Object.assign(new Error("description not exist"),{ code: null });
            if (data.description.value.length > 200) throw Object.assign(new Error("description too long"),{ code: null });
            if (!data.bedroom.value) throw Object.assign(new Error("bedroom not exist"),{ code: null });
            if (parseInt(data.bedroom.value) < 1 || parseInt(data.bedroom.value) > 10 ) throw Object.assign(new Error("bedroom number invalid"),{ code: null });
            if (!data.bath.value) throw Object.assign(new Error("bath not exist"),{ code: null });
    
            if (parseInt(data.bath.value) < 0|| parseInt(data.bath.value) > 10) throw Object.assign(new Error("bath number invalid"),{ code: null });
            if (!data.price.value) throw Object.assign(new Error("price not exist"),{ code: null });
            if (parseInt(data.price.value) < 0) throw Object.assign(new Error("price invalid"),{ code: null });
            if (!data.zipcode.value) throw Object.assign(new Error("zipcode not exist"),{ code: null });
            if (data.zipcode.value.length !== 5) throw Object.assign(new Error("zipcode invalid"),{ code: null });
            if (!data.type.value) throw Object.assign(new Error("type is not exist"),{ code: null });
            if (data.type.value !== "apartment" && data.type.value !== "house" ) throw Object.assign(new Error("type is invalid"),{ code: null });

            await serverController.editProperty(props.match.params.id,currentUser, data);
            // setIsSuccess(true);
            props.history.push("/account")
            setLoading(false)
            alert.current.success('Edit sucessfully');
        }catch(error){
            setLoading(false)
            alert.current.error(error.message)
        }
    }

    if (loading) {
        return (
            <div className="lds-facebook"><div></div><div></div><div></div></div>
        )
    }

    if (!propertyData) {
		return (
			<div className='show-body'>
        <Helmet>
              <title>Edit property - RentSIT</title>
        </Helmet>
				<p>Property Not Found!</p>
			</div>
		)
    }

    return (
        <div>
	    	<Helmet>
              <title>Edit property - RentSIT</title>
        </Helmet>
            <h1>Edit</h1>
            <form onSubmit={editProperty}>
                <div className="row">
                <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input className="form-control" id="title" name="title" placeholder="title" data-tip="title length must less than 70" defaultValue={(propertyData && propertyData.title) || 'Not Provided'}/>
                </div>
                </div>
                <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" rows="10" className="form-control" name="description" type="text" placeholder="description" data-tip="description length need to less than 200" defaultValue={(propertyData && propertyData.description) || 'Not Provided'}  />
                </div>
                </div>

                <div className="col-md-12">
                    {uploadImage}
                    {preview || existing_preview ? <div className="row mb-2">{existing_preview}{preview}</div> : null}
                </div>

                <div className="col-md-12">
                    <label>Type</label>
                    <div>
                    <div className="custom-control col-3 custom-radio mb-3">
                        <input name="type" value="apartment" className="custom-control-input" id="type-apartment" type="radio" defaultChecked={propertyData.type === "apartment"}/>
                        <label className="custom-control-label" htmlFor="type-apartment">Apartment</label>
                    </div>
                    <div className="custom-control col-3 custom-radio mb-3">
                        <input name="type" value="house" className="custom-control-input" id="type-house" type="radio" defaultChecked={propertyData.type === "house"} />
                        <label className="custom-control-label" htmlFor="type-house">House</label>
                    </div>
                    </div>
                </div>

                <div className="col-md-3">
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input className="form-control" name="price" id="price" placeholder="price" type="number" data-tip="price need to greater than 0" defaultValue={propertyData.price}/>
                </div>
                </div>

                <div className="col-md-3">
                <div className="form-group">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input className="form-control" id="zipcode" name="zipcode" type="text" placeholder="07030" data-tip="length must equal to 5" defaultValue={ propertyData.zipcode}/>
                </div>
                </div>

                <div className="col-md-3">
                <div className="form-group">
                    <label htmlFor="bedroom">Bedroom</label>
                    <input className="form-control" id="bedroom" name="bedroom" type="number" placeholder="3" data-tip="bedroom need to greater than 0 and less than 10" defaultValue={ propertyData.bedroom}/>
                </div>
                </div>

                <div className="col-md-3">
                <div className="form-group">
                    <label htmlFor="bath">Bath</label>
                    <input className="form-control" id="bath" name="bath" type="number" placeholder="1" data-tip="bedroom need to greater than 0 and less than 10" defaultValue={ propertyData.bath}/>
                </div>
                </div>
            </div>

            <button className="btn btn-primary" type="submit">Update</button>
            </form>

            <ReactTooltip />
        </div>
	);
}
export default EditProperty;
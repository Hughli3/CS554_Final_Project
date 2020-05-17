import React, {useState, useContext, useCallback, useEffect, createRef} from 'react';
import { AuthContext } from "../auth/Auth";
import Watchlist from "./Watchlist";
import Property from "./Property";
import AddProperty from "./AddProperty";
import EditProperty from "./EditProperty";
import PrivateRoute from "../auth/PrivateRoute";
import serverController from "../../serverController"
import { useAlert } from 'react-alert';
import { Link, Switch } from 'react-router-dom';
import ReactTooltip from "react-tooltip";
import {useDropzone} from 'react-dropzone'
import { Helmet } from 'react-helmet';

export default function Account(props){
    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const colseModal = createRef();
    const [imageData, setImageData] = useState([null, null, null]);

	const alert = useAlert();
	useEffect(
		() => {
			async function fetchData() {
				try {
					setLoading(true);
					const {data: resData} = await serverController.getUser(currentUser);
                    setUserData(resData);
					setLoading(false);
				} catch (e) {
                    setLoading(false);
                    alert.error(e.message);
				}
			}
			fetchData();
		},
		[]
    );

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
        setImageData(files[0])
    }, [])

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png',
        minSize: 0,
        maxSize: 5242880,
        multiple: false
    })
        
    if (loading) {
        return (
            <div className="lds-facebook"><div></div><div></div><div></div></div>
        )
    }

    const editUser = async (event) => {
        colseModal.current.click()
        event.preventDefault();
        try{
            const data = event.target.elements;
            if (data.phone.value.length !== 10 && data.phone.value.length !== 0) throw Object.assign(new Error("phone number wrong format"),{ code: null });
            const {data: resData} = await serverController.editUser(currentUser, data.phone.value, imageData);
            setUserData(resData);
            alert.success('Edit sucessfully');
        }catch(error){
            alert.error(error.message)
        }
    }
    
    return(
        <section className="section account">
        <Helmet>
              <title>Account - RentSIT</title>
        </Helmet>
            <div className="container">
                {/* <h1 className='mb-5'>Account</h1> */}
                <div className="row justify-content-center">
                    <div className="col-lg-3 col-md-4 col-6">
                        <div className="avatar-container">
                            {userData.avatar ? 
                            (<img src={userData.avatar} id="user-avatar" className="img-fluid avatar" alt="user avatar" />)
                            : (<img src="/img/default_user.png" id="user-avatar" className="img-fluid avatar" alt="user avatar" /> )
                            }
                        </div>
                        {userData.email ? (
					        <div className="icon-group mt-4">
                                <p>
                                    <i className="fas fa-user"></i>{userData.email} 
                                </p>
                            </div>) : null}
                        {userData.phone ? (
                        <div className="icon-group my-3">
                            <p>
                                <i className="fas fa-phone"></i>{userData.phone}
                            </p>
                        </div>) : null}
                        <div>
                            <Link className='' to='/account'>
                                <button className="btn my-3 w-100 btn-secondary">My property</button>
                            </Link>
                        </div>
                        <div>
                            <Link className='' to='/account/watchlist'>
                                <button className="btn my-3 w-100 btn-secondary">My watchlist</button>
                            </Link>
                        </div>
                        <div>
                            <button className="btn my-3 w-100 btn-secondary" data-toggle="modal" data-target="#edit-profile-modal">Edit profile</button>
                        </div>
                    </div>
                    <div className="col-lg-9 col-12 pl-4">
                        <Switch>
                            <PrivateRoute exact path='/account/' component={Property}/>
                            <PrivateRoute exact path='/account/property/add' component={AddProperty}/>
                            <PrivateRoute exact path='/account/watchlist' component={Watchlist}/>
                            <PrivateRoute exact path='/account/property/:id' component={EditProperty}/>
                        </Switch>
                    </div>
                </div>
            </div>
            {/* modal for edit profile */}
            <div className= "modal fade" id="edit-profile-modal" tabindex="-1" role="dialog" aria-labelledby="modal-title-edit-profile" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title display-4" id="modal-title-edit-profile">Edit Profile</h2>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>

                        <form onSubmit={editUser}>
                            <div className="modal-body">
                                <div className="avatar-edit-container">
                                    <div className="avatar-container" {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {imageData[2] ? 
                                        (<img src={imageData[2]} id="user-avatar" className="img-fluid avatar" alt="user avatar" />)
                                        : (<img src={userData.avatar ? userData.avatar : "/img/default_user.png"} id="user-avatar" className="img-fluid avatar" alt="user avatar" /> )
                                        }
                                        <div className="overlay">
                                            <div className="text">Edit</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="title" value={userData.email} disabled/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input className="form-control" id="phone" name="phone" type="tel" placeholder="phone" defaultValue={userData.phone} data-tip="please input a 10 digit phone number"/>    
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Update</button>
                                <button type="button" ref={colseModal} className="btn btn-link ml-auto" data-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            <ReactTooltip />
            </div>
            
        </section>
    )
}
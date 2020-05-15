import React, {useState, useContext, useEffect} from 'react';
import { AuthContext } from "../auth/Auth";
import Watchlist from "./Watchlist";
import Property from "./Property";
import AddProperty from "./AddProperty";
import EditProperty from "./EditProperty";
import EditProfile from "./EditProfile";
import PrivateRoute from "../auth/PrivateRoute";
import serverController from "../../serverController"
import { useAlert } from 'react-alert';
import { Link, Switch } from 'react-router-dom';

export default function Account(props){
    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

	const alert = useAlert();
	useEffect(
		() => {
			async function fetchData() {
				try {
					setLoading(true);
					const {data: resData} = await serverController.getUser(currentUser);
					console.log(resData)
					setUserData(resData);
					setLoading(false);
				} catch (e) {
                    alert.error(e);
					setLoading(false);
				}
			}
			fetchData();
		},
		[]
	);

    if (loading) {
        return (
            <div class="lds-facebook"><div></div><div></div><div></div></div>
        )
    }

    const editUser = async (event) => {
        event.preventDefault();
        console.log("submitted")
        try{
            const data = event.target.elements;
            // if (!data.phone.value) throw "phone not exist";
            // TODO avatar 
            let avatar = null;
            const {data: resData} = await serverController.editUser(currentUser, data.phone.value, avatar);
            setUserData(resData);
            // setIsSuccess(true);
            // props.history.push("/account")
            alert.success('Edit sucessfully');
        }catch(error){
            alert.error(error)
        }
    }
    
    return(
        <section class="section account">
            <div class="container">
                {/* <h1 className='mb-5'>Account</h1> */}
                <div className="row justify-content-center">
                    <div className="col-lg-3 col-md-4 col-6">
                        <div class="avatar-container">
                            <img src="{{#if user.avatar}}{{user.avatar}}{{else}}/public/img/avatar/default-user.png{{/if}}" id="user-avatar" class="img-fluid avatar" alt="user avatar" />                
                        </div>
                        {userData.email ? (
					        <div class="icon-group mt-4">
                                <p>
                                    <i class="fas fa-user"></i>{userData.email} 
                                </p>
                            </div>) : null}
                        {userData.phone ? (
                        <div class="icon-group my-3">
                            <p>
                                <i class="fas fa-phone"></i>{userData.phone}
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
                            {/* <PrivateRoute exact path='/account/edit' component={EditProfile} />                             */}
                        </Switch>
                    </div>
                </div>
            </div>
            {/* modal for edit profile */}
            <div class= "modal fade" id="edit-profile-modal" tabindex="-1" role="dialog" aria-labelledby="modal-title-edit-profile" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title display-4" id="modal-title-edit-profile">Edit Profile</h2>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>

                        <form onSubmit={editUser}>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" class="form-control" id="email" placeholder="title" value={userData.email} disabled/>
                                </div>
                                <div class="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input class="form-control" id="phone" name="phone" type="tel" placeholder="phone" defaultValue={userData.phone}/>    
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">Update</button>
                                <button type="button" class="btn btn-link ml-auto" data-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
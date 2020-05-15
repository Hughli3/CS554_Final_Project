import React, {useContext, useState, useEffect} from 'react';
import { AuthContext } from "../auth/Auth";
import serverController from '../../serverController';
import { Redirect } from "react-router";
import { useAlert } from 'react-alert'
// import Select from 'react-select';

const EditProfile = (props) => {
    const alert = useAlert();

    // console.log(userDataa)

    // const [ isSuccess, setIsSuccess] = useState(false);
	const [ userData, setUserData ] = useState();
	const [ loading, setLoading ] = useState(true);
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
			async function getUserData() {
				try {
					setLoading(true);
                    const {data: user}  = await serverController.getUser(currentUser)
                    setUserData(user);
                    setLoading(false);
				} catch (e) {
                    alert.error(e)
                    setLoading(false);
				}
			}
            getUserData();
		},
		[]
    );

    const editUser = async (event) => {
        event.preventDefault();

        try{
            const data = event.target.elements;
            // if (!data.phone.value) throw "phone not exist";
            // TODO avatar 
            let avatar = null;
            await serverController.editUser(currentUser, data.phone.value, avatar);
            // setIsSuccess(true);
            props.history.push("/account")
            alert.success('Edit sucessfully');
        }catch(error){
            alert.error(error)
        }

    }

    // if (isSuccess) {
    //     return <Redirect to="/account" />;
    // }

    if (loading) {
        return (
            <div class="lds-facebook"><div></div><div></div><div></div></div>
        )
    }
    
    return (
        <div>
            <h1>Edit Profile</h1>
            <form onSubmit={editUser}>
                <div className="row">
                    <div class="col-md-6">
                    <div class="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" class="form-control" id="email" placeholder="title" value={userData.email} disabled/>
                    </div>
                    </div>
                    <div class="col-md-6">
                    <div class="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input class="form-control" id="phone" name="phone" type="tel" placeholder="phone" defaultValue={userData.phone}/>    
                    </div>
                    </div>
                </div>

                <button className="btn btn-primary" type="submit">Post</button>
            </form>
        </div>
	);
}
export default EditProfile;
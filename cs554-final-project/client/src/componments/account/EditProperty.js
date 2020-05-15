import React, {useContext, useState, useEffect} from 'react';
import { AuthContext } from "../auth/Auth";
import serverController from '../../serverController';
import { Redirect } from "react-router";
import { useAlert } from 'react-alert'
// import Select from 'react-select';

const EditProperty = (props) => {
    const alert = useAlert();
    const [isSuccess, setIsSuccess] = useState(false);

	const [ propertyData, setPropertyData ] = useState();
	const [ loading, setLoading ] = useState(true);
	const { currentUser } = useContext(AuthContext);

	useEffect(
		() => {
			async function getPropertyData() {
				try {
					setLoading(true);
                    const {data: property}  = await serverController.getProperty(props.match.params.id)
                    
                    setPropertyData(property);
                    // console.log(propertyData);
				} catch (e) {
                    setLoading(false);
					console.log(e)
				}
			}
            getPropertyData();
            setLoading(false);
		},
		[ props.match.params.id ]
	);

    const editProperty = async (event) => {
        event.preventDefault();

        try{
            const data = event.target.elements;

            let time = new Date();
            data.date = Date.parse(time);
            // console.log(data);
            if (!data.title.value) throw "title not exist"
            if (data.title.value.length > 70) throw "title too long";
            if(!data.description.value) throw "description not exist"
            if (data.description.value.length > 200) throw "description too long";
            if (!data.bedroom.value) throw "bedroom not exist"
            if (data.bedroom.value < 1 || data.bedroom.value > 10 ) throw "bedroom number invalid";
            if (!data.bath.value) throw "bath not exist"
            if (data.bath.value < 0|| data.bath.value > 10) throw "bath number invalid";
            if (!data.price.value) throw "price not exist"
            if (data.price.value < 0) throw "price invalid";
            if (!data.zipcode.value) throw "zipcode not exist"
            if (data.zipcode.value.length != 5) throw "zipcode invalid";

            await serverController.editProperty(props.match.params.id,currentUser, data);
            setIsSuccess(true);
            alert.success('Edit sucessfully');
        }catch(error){
            alert.error(error)
        }

    }

    if (isSuccess) {
        return <Redirect to="/account/property" />;
    }

	if (loading) {
		return (
			<div className='show-body'>
				<p>loading...</p>
			</div>
		)
    }
    if (!propertyData) {
		return (
			<div className='show-body'>
				<p>404 - Pokemon Not Found!</p>
			</div>
		)
	}
    return (
		<div className='show-body'>

            <div>
                <h1>Edit</h1>
                <form onSubmit={editProperty}>
                <label htmlFor="title">Title</label>
                <input id="title" name="title" type="text" placeholder="title" defaultValue={(propertyData && propertyData.title) || 'Not Provided'}/>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" type="text" placeholder="description" defaultValue={(propertyData && propertyData.description) || 'Not Provided'} />
                <label htmlFor="type">Type</label>
                <select defaultValue={(propertyData && propertyData.type) || 'Not Provided'} id="type" name="type">
                <option value="apartment">apartment</option>
                <option value="house">house</option>
                </select>
                <label htmlFor="price">Price</label>
                <input id="price" name="price" type="number" placeholder="price" defaultValue={(propertyData && propertyData.price) || 'Not Provided'}/>
                <label htmlFor="zipcode">Zipcode</label>
                <input id="zipcode" name="zipcode" type="text" placeholder="07030" data-tip="length must equal to 5" defaultValue={(propertyData && propertyData.zipcode) || 'Not Provided'}/>
                <label htmlFor="bedroom">Bedroom</label>
                <input id="bedroom" name="bedroom" type="number" placeholder="3" defaultValue={(propertyData && propertyData.bedroom) || 'Not Provided'}/>
                <label htmlFor="bath">Bath</label>
                <input id="bath" name="bath" type="number" placeholder="1" defaultValue={(propertyData && propertyData.bath) || 'Not Provided'}/>

                <button type="submit">Update</button>
                </form>
            </div>
		</div>
	);
}
export default EditProperty;
import React, {useContext, useState} from 'react';
import { AuthContext } from "../auth/Auth";
import serverController from '../../serverController';
import { Redirect } from "react-router";
import { useAlert } from 'react-alert'
// import Select from 'react-select';

const AddProperty = () => {
    const alert = useAlert()
    const { currentUser } = useContext(AuthContext);
    const [isSuccess, setIsSuccess] = useState(false)


    const addProperty = async (event) => {
      event.preventDefault();
      const data = event.target.elements;

    
      let time = new Date()
      data.date = Date.parse(time);
      console.log(data);
      try {
        // TODO move these checker into function
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
        if (!data.zipcode.value) throw "zipcode not exist";
        if (data.zipcode.value.length != 5) throw "zipcode invalid";
        await serverController.postProperty(currentUser, data);
        setIsSuccess(true)
        alert.success('Signup sucessfully')
      } catch (error) {
        // console.log(error);
        alert.error(error)
      }
    };

    if (isSuccess) {
        return <Redirect to="/account/property" />;
    }
      
  
    return (
    <div>
        <h1>Add</h1>
        <form onSubmit={addProperty}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" placeholder="title" />
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" type="text" placeholder="description"  />
        <label htmlFor="type">Type</label>
        <select defaultValue="apartment" id="type" name="type">
          <option value="apartment">apartment</option>
          <option value="house">house</option>
        </select>
        <label htmlFor="price">Price</label>
        <input id="price" name="price" type="number" placeholder="price" />
        <label htmlFor="zipcode">Zipcode</label>
        <input id="zipcode" name="zipcode" type="text" placeholder="07030" data-tip="length must equal to 5"/>
        <label htmlFor="bedroom">Bedroom</label>
        <input id="bedroom" name="bedroom" type="number" placeholder="3" />
        <label htmlFor="bath">Bath</label>
        <input id="bath" name="bath" type="number" placeholder="1" />

        <button type="submit">Post</button>
        </form>
    </div>
    );
}

export default AddProperty;
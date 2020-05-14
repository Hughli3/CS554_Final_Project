import React, {Component, useContext, useState} from 'react';
import { AuthContext } from "../auth/Auth";
import serverController from '../../serverController';
import { Redirect } from "react-router";
// import Select from 'react-select';

const AddProperty = () => {
    const { currentUser } = useContext(AuthContext);
    const [isSuccess, setIsSuccess] = useState(false)

    // TODO get data from server

    const addProperty = async (event) => {
        event.preventDefault();
        const data = event.target.elements;
        let time = new Date()
        data.date = time.toLocaleString("en", {hour12:false});
        console.log(data);
        try {
          await serverController.postProperty(currentUser, data)
          setIsSuccess(true)
        } catch (error) {
          alert(error);
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
        <input id="description" name="description" type="text" placeholder="description"  />
        <label htmlFor="type">Type</label>
        <select>
          <option value="apartment">apartment</option>
          <option value="house">house</option>
        </select>
        <label htmlFor="price">Price</label>
        <input id="price" name="price" type="number" placeholder="price" />
        <label htmlFor="zipcode">Zipcode</label>
        <input id="zipcode" name="zipcode" type="text" placeholder="07030" />
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
import React, {Component, useContext, useState} from 'react';
import { AuthContext } from "../auth/Auth";
import serverController from '../../serverController';
import { Redirect } from "react-router";

// import NoMatch from "./NoMatch"

const AddProperty = () => {
    const { currentUser } = useContext(AuthContext);
    const [isSuccess, setIsSuccess] = useState(false)

    const addProperty = async (event) => {
        event.preventDefault();
        const data = event.target.elements;

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
        <label htmlFor="desdcription">Description</label>
        <input id="desdcription" name="description" type="text" placeholder="description" />
        <label htmlFor="price">Price</label>
        <input id="price" name="price" type="text" placeholder="price" />
        <button type="submit">Post</button>
        </form>
    </div>
    );
}

export default AddProperty;
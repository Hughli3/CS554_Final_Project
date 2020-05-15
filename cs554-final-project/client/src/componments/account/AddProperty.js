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
        return <Redirect to="/account" />;
    }
      
    return (
    <div>
        <h1>Post Property</h1>
        <form onSubmit={addProperty}>
          <div className="row">
            <div class="col-md-12">
              <div class="form-group">
                <label htmlFor="title">Title</label>
                <input class="form-control" id="title" name="title" placeholder="title" />
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <label htmlFor="description">Description</label>
                <textarea id="description" rows="10" class="form-control" name="description" type="text" placeholder="description"  />
              </div>
            </div>

            <div class="col-md-12">
                <label>Type</label>
                <div>
                  <div class="custom-control col-3 custom-radio mb-3">
                    <input name="type" value="apartment" class="custom-control-input" id="type-apartment" type="radio" />
                    <label class="custom-control-label" for="type-apartment">Apartment</label>
                  </div>
                  <div class="custom-control col-3 custom-radio mb-3">
                    <input name="type" value="house" class="custom-control-input" id="type-house" type="radio" />
                    <label class="custom-control-label" for="type-house">House</label>
                  </div>
                </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <label htmlFor="price">Price</label>
                <input class="form-control" name="price" id="price" placeholder="price" type="number"/>
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
                <input class="form-control" id="bedroom" name="bedroom" type="number" placeholder="3" />
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
    </div>
    );
}

export default AddProperty;
import React, {useState, useEffect} from 'react'
import Property from './Property'

import Dropdown from 'react-bootstrap/Dropdown'
import FormControl from 'react-bootstrap/FormControl'
import DropdownButton from 'react-bootstrap/DropdownButton'

export default function PropertyList(props) {
  const [priceOrder, setPriceOrder] = useState(undefined);
  const [properties, setProperties] = useState(()=> {
    return props.propertyList || []
  })

  useEffect(() => {
    function sort(data, increase){
      if( increase === true){
        let res = data.sort((a, b)=>{ return b.price - a.price});
        return res
      }else if(increase === false){
        let res = data.sort((a, b)=>{ return a.price - b.price});
        return res
      }else{
        return props.propertyList
      }
    }
    console.log("here");
    console.log(priceOrder);
    setProperties(sort(properties, priceOrder))
  }, [priceOrder])

  
  const sortBy = (
    <DropdownButton title="sortBy">
      <Dropdown.Item as="button" onClick={()=> {setPriceOrder(true);console.log(priceOrder)}}>Price (low to high)</Dropdown.Item>
      <Dropdown.Item as="button" onClick={()=> {setPriceOrder(false);console.log(priceOrder)}}>Price (high to low)</Dropdown.Item>
      <Dropdown.Item as="button" onClick={()=> {setPriceOrder(undefined);console.log(priceOrder)}}>Reset</Dropdown.Item>
  </DropdownButton>
  );

  const beds = (
    <Dropdown>
    <Dropdown.Toggle variant="success" id="property-beds">
      Beds
    </Dropdown.Toggle>
  
    <Dropdown.Menu>
      <FormControl placeholder="Min"></FormControl>
      <p>-</p>
      <FormControl placeholder="Max"></FormControl>
      <Dropdown.Item>Price (low to high)</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Price (high to low)</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Title</Dropdown.Item>
      <Dropdown.Item>Last Updated</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  );

  const types = (
    <Dropdown title="Types">
      <Dropdown.Item ></Dropdown.Item>
      <Dropdown.Item>Price(high to low)</Dropdown.Item>
      <Dropdown.Item>Title</Dropdown.Item>
      <Dropdown.Item>Last Updated</Dropdown.Item>

    </Dropdown>
  );

  // function filter(data, filterType){
  //   if(filter===null){

  //   }
  // }


    
    const thePropertyList =  properties.map(property => <Property key={property.uid} property = {property} />)
    return (
        <div>
          {sortBy}
          {beds}
          {types}
          {thePropertyList}
        </div>
    )
}

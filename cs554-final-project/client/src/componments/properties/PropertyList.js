import React, {useState, useEffect} from 'react'
import Property from './Property'

import Dropdown from 'react-bootstrap/Dropdown'
import FormControl from 'react-bootstrap/FormControl'
import DropdownButton from 'react-bootstrap/DropdownButton'

export default function PropertyList(props) {
  const [properties, setProperties] = useState(()=> {
  return props.propertyList || []
})
  // const [priceLowerLimit, setPriceLowerLimit] = useState(undefined)
  // const [priceUpperLimit, setPriceUpperLimit] = useState(undefined)
  // const [lastUpdate, setLastUpdate] = useState(false);
  const [sortOptions, setSortOption] = useState({
    price:null, lastUpdate:false
  })
  useEffect(() => {
    function sort(data, sortOptions){
      if( sortOptions.price === "down"){
        let res = data.sort((a, b)=>{ return b.price - a.price});
        return res
      }else if(sortOptions.price === "rise"){
        let res = data.sort((a, b)=>{ return a.price - b.price});
        return res
      }else if(sortOptions.lastUpdate === true){
        console.log("i'm in sort")

        let res = data.sort((a, b) => {
          let date1 = new Date(a.lastUpdate);
          let date2 = new Date(b.lastUpdate);
          return -(date1.getTime() - date2.getTime());
        });
        return res;
      }else{
        return props.propertyList;
      }
    }

    function filter(data, priceLowerLimit,priceUpperLimit){
      if(filter===null){

    }
  }

    console.log("In effect, here");
    setProperties(sort(properties, sortOptions))
    // console.log(properties);
  }, [sortOptions, properties])

  
  const sortBy = (
    <DropdownButton title="sortBy">
      <Dropdown.Item as="button" onClick={()=> {setSortOption({price:"rise", lastUpdate:false})}}>Price (low to high)</Dropdown.Item>
      <Dropdown.Item as="button" onClick={()=> {setSortOption({price:"down", lastUpdate:false})}}>Price (high to low)</Dropdown.Item>
      <Dropdown.Item as="button" onClick={()=> {setSortOption({price:null, lastUpdate:true})}}>Last Update</Dropdown.Item>
      <Dropdown.Item as="button" onClick={()=> {setSortOption({price:null, lastUpdate:false})}}>Reset</Dropdown.Item>
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

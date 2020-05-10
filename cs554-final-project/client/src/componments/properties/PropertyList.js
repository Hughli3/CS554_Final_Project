import React from 'react'
import Property from './Property'

export default function PropertyList(props) {
    // TODO Filter, Sort
    function filter(data, filterType){

    }

    function sort(data, sortBy){

    }


    const thePropertyList =  props.propertyList.map(property =>  <Property key={property.uid} property = {property} />)
    return (
        <div>
          {thePropertyList}
        </div>
    )
}

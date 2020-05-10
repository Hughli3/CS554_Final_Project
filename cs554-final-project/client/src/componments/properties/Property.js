import React from 'react'
import Avatar from './Avatar'
import PropertyInfo from './PropertyInfo'

export default function Property(props) {
    return (
        <div class="PropertyInfo">
            <Avatar property={props.property} />
            <PropertyInfo property={props.property} />
        </div>
    )
}

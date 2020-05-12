import React from 'react'

export default function Avatar(props) {
    return (
        <div>
            <img className="Avatar"
            src={props.property.image}
            alt={props.property.name} />
        </div>
    )
}

import React from 'react'

export default function Avatar(props) {
    return (
        <div>
            <img className="userAvatar"
            src={props.user.image}
            alt={props.user.name} />
        </div>
    )
}

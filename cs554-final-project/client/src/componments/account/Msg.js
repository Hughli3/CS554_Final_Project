import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../auth/Auth";
import Alert from 'react-bootstrap/Alert';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Msg = (props) => {
	const [ msg, setMsg ] = useState(props.msg);
	const [ show, setShow ] = useState(false);

	useEffect(
		() => {
            setMsg(props.msg);
            setShow(true);
			setTimeout(function(){
                setShow(false);
                setMsg('');
		   	}.bind(this),3000);  // wait 5 seconds, then reset to false
		},
		[props.msg]
    );

    // setStatus(props.status)

    if (show) {
        return (
            <Alert key='1' variant='success'> 
                {msg}
            </Alert>
        )
    }

    return (null);
};

export default Msg;

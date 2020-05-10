import React, { useCallback, useContext } from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "./auth/Auth";
import app from "./auth/AuthBase"
import PropertyList from './properties/PropertyList'
const Home = () => {

    const { currentUser } = useContext(AuthContext);

	// const [ loading, setLoading ] = useState(true);

    // if (loading) {
	// 	return (
	// 		<div className='show-body'>
	// 			<p>loading...</p>
	// 		</div>
	// 	)
	// }

    return (
        <div className='App-body'>
            <h1 className='cap-first-letter'> Home </h1>
        </div>
    );
}

export default Home;
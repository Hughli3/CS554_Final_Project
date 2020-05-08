import React, { useCallback, useContext } from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "./auth/Auth";
import app from "./auth/AuthBase"

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
            {currentUser ? (
                <div>
                    <button onClick={() => app.auth().signOut()}>Sign out</button>
                    <p>Welcome: {app.auth().currentUser.uid}</p>
                    <p>Welcome: {app.auth().currentUser.email}</p>
                    <li>
                        <Link className='Accountlink' to='/account'>account</Link>
                    </li>
                </div>
            ) : (
              <div>
                <li>
                  <Link className='Loginlink' to='/login'>login</Link>
                </li>
                <li>
                  <Link className='Signuplink' to='/signup'>signup</Link>
                </li>
              </div>
            )}
        </div>
    );
}

export default Home;
import React from 'react';
import app from "../base"

const Home = () => {
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
            <button onClick={() => app.auth().signOut()}>Sign out</button>
        </div>
    );
}

export default Home;
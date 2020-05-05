import React, {Component} from 'react';

class NoMatch extends Component{
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div className='App-body'>
                <h1>404</h1>
                <h2>Not Found !</h2>
            </div>
        );
    }
}

export default NoMatch;
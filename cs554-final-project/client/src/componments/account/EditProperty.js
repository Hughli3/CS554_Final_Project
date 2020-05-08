import React, {Component} from 'react';
import NoMatch from "./NoMatch"

class AccountProperty extends Component{
    constructor(props){
        super(props)
        this.state = {notFind:false, loading:true}
    }

    async getUser() {
        try {
            this.setState({loading:false})
        } catch (e) {
            this.setState({notFind:true})
        }
    }

    componentDidMount() {
        this.getUser();
    }

    render() {
        if(this.state.loading){
            return <div><p>Loading...</p></div>;
        } else if(this.state.notFind){
            return <NoMatch />
        } else {
            return (
                <div className='App-body'>
                    <h1 className='cap-first-letter'> AccountProperty </h1>
                </div>
            );
        }
    }
}

export default AccountProperty;
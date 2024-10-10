import React from 'react'
import AllPosts from '../components/Post'

class Home extends React.Component{
    constructor(props){
        super(props);
    
    }

    render(){
        return(
            <div>
                <h1>Hello Posts Page!</h1>
                <AllPosts/>
            </div>
        );
    }
}

export default Home
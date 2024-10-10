import React from 'react'

import { Link } from 'react-router-dom'

class DeletePost extends React.Component{
    constructor(props){
        super(props)
        
    }

    render(){
        return(
            <div>
                <button onClick={this.props.deleteValue}>Delete post</button>
            </div>
        )
    }
}

export default DeletePost
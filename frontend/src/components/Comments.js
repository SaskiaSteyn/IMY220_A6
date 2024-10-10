import React from 'react'

class Comment extends React.Component{

    constructor(props){
        super(props);
        
    }    

    render(){
        return(
            <div>
                <h4>{this.props.name}</h4>
                <p>{this.props.comment}</p>
            </div>
        );
    }
}

class AllComments extends React.Component{
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div>
                {this.props.comments.map((comment, index) =>{
                            return(
                                <Comment
                                    key={index}
                                    name = {comment.name}
                                    comment = {comment.comment}
                                />
                            )
                        })}
            </div>
        );
    }
}

export default AllComments
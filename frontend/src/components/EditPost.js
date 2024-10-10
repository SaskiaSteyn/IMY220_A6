import React from 'react'

class EditPost extends React.Component{
    constructor(props){
        super(props)
        this.editValue = this.editValue.bind(this);

    }

    editValue(event){
        event.preventDefault();
        this.props.updateValue(event);
    }

    render(){
        return(
            <div className="edit-post">
                <form onSubmit={this.editValue}>
                    <label>Post Title</label>
                    <br/>
                    <input type="text" id="title" name="title" defaultValue={this.props.title}/>
                    <br/>
            
                    <label>Post Content</label>
                    <br/>
                    <textarea id="description" name="description" rows="4" defaultValue={this.props.description}></textarea>
                    <br/>
            
                    <button type="submit">Save</button>
                </form>
            </div>
        )
    }
}

export default EditPost
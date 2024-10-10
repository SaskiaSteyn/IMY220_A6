import React from 'react'
import DeletePost from './DeletePost'
import EditPost from './EditPost'

class Post extends React.Component{

    constructor(props){
        super(props);
        this.showEdit = this.showEdit.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.deleteValue = this.deleteValue.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.state = {
            hidden: false,
            name: this.props.name,
            content: this.props.content
        }
    }    

    showEdit(){
        this.setState({hidden : !this.state.hidden});
    }

    updateValue(event){
        event.preventDefault();
        this.updatePost(event.target[0].value, event.target[1].value);
    }

    async updatePost(name, content){
        try {
            const response = await fetch('http://localhost:3000/post', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PATCH',
                body: JSON.stringify({
                    id: this.props.id,
                    name: name,
                    content: content
                }),
                
              });

            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();

            this.setState({
                name: name,
                content: content
            });
            this.props.fetchPosts();
        } catch (error) {
            console.error(error.message);
        }
    }

    deleteValue(event){
        event.preventDefault();
        this.deletePost();        
    }

    async deletePost(){
        try {
            const response = await fetch('http://localhost:3000/post', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
                body: JSON.stringify({
                    id: this.props.id
                }),
                
              });

            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();

            // this.setState({
            //     posts: json
            // })
            this.props.fetchPosts();
        } catch (error) {
            console.error(error.message);
        }
    }

    render(){
        return(
            <div className="post-card">
                <h2>{this.state.name}</h2>
                <p className="author">{this.props.author}</p>
                <hr/>
                <p>{this.state.content}</p>
                <button onClick={this.showEdit}>Edit post</button>
                {this.state.hidden && <EditPost name={this.props.name} content={this.props.content} updateValue={this.updateValue}/>}
                <DeletePost deleteValue = {this.deleteValue}/>
            </div>
        );
    }
}

class AllPosts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [],
        }
        this.fetchPosts = this.fetchPosts.bind(this);
    
    }

    componentDidMount(){
        //fetch call 
        this.fetchPosts();
    }

    async fetchPosts(){
        try {
            const response = await fetch('http://localhost:3000/posts', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                
              });

            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();

            // const playlistPreviewsTemp = this.playlistPreviewLoop(json);

            this.setState({
                posts: [...json]
            })
        } catch (error) {
            console.error(error.message);
        }
    }

    
    render() {
        return (
            <div>
                {this.state.posts.map((post, index) =>{
                            return(
                                <Post
                                    key={post.id}
                                    id = {post.id}
                                    name = {post.name}
                                    author = {post.author.name}
                                    content = {post.content}
                                    fetchPosts = {this.fetchPosts}
                                />
                            )
                        })}
            </div>
        );
    }
}

export default AllPosts
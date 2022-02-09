import { Component } from "react";
import './StyleSheet.css';

export default class AddPost extends Component {
    constructor() {
        super()
        this.state = {
            PostTitle: '',
            body: ''
        }
    }

    //This function sends the new post's data to the mainPosts component:
    addPost = () => {
        this.props.addPost(this.state.PostTitle, this.state.body)
    }

    //handling the input from the client:
    handleChange = (e) => this.setState({ [e.target.name]: e.target.value })
    
    render() {
        return (<div className="AddPostDiv" style={{ display: this.props.showAddPost ? 'block' : 'none' }}>
            <div className="AddPostTitle" style={{ display: this.props.showAddPost ? 'block' : 'none' }}>New Post - User: {this.props.id}</div>
            <div className="AddPostInnerDiv">
                Title:<input className="otherInputs" type='text' name="PostTitle" onChange={this.handleChange} /><br />
                Body:<input className="otherInputs" type='text' name="body" onChange={this.handleChange} /><br />
                <input className="addButton" type='button' onClick={this.props.hide} value='Cancel' />
                <input className="addButton" type='button' onClick={this.addPost} value='Add' />
            </div>
        </div>)
    }
}
import React, { Component } from 'react';
import axios from 'axios';

class CreatePost extends Component {

    state = {
        title: undefined,
        content: undefined,
        data: undefined
    }

    componentDidMount() {
        var x = JSON.parse(localStorage.getItem("token"));
        axios.post('http://localhost:3000/users/auth/', x).then(res => {
            console.log(res.data);
            this.setState({  data: res.data });
        }).catch((err) => {
            console.log("Error: " + err);
        });
    }

    onChangeTiltle = (e) => {
        const title = e.target.value;
        this.setState({ title: title});
    }

    onChangeBlogContent = (e) => {
        const content = e.target.value;
        this.setState({ content: content});
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log("hello");
        

        const Post = {
            userid: this.state.data.userid,
            username: this.state.data.username,
            title: this.state.title,
            content: this.state.content
        };
        
        axios.post("http://localhost:3000/posts/create-post", Post).then(res => console.log(res.data));
        
        window.location = '/blogs';
        
    }

    content = () => {
        var x = JSON.parse(localStorage.getItem("token"));
        if (x !== null) {
            return (
                <div className="container mt-5">
                    <br/>
                    <h2>create Blog</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <br/>
                            <input type="text" className="form-control" placeholder="Enter Blog Title" 
                                    onChange={this.onChangeTiltle} />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label>Post Content</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="6"
                                    placeholder="Enter Blog Content" onChange={this.onChangeBlogContent} />
                        </div>
                        <br/>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary btn-block align-center">Create</button>
                        </div>
                    </form>
                </div>
            );
        } else {
            window.location = '/';
        }
    }

    render() { 
        return (
            <div>
                {
                    this.content()
                }
            </div>
        );
    }
}

export default CreatePost;
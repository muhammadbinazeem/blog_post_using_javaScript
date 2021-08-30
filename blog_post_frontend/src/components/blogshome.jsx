import React, { Component } from 'react';
import Blog from './blog';
import axios from 'axios';
import Pagination from './commons/pagination';
import { paginate } from './utils/paginate';

class BlogsHome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userid: '',
            allposts: [],
            currentPage: 1,
            pageSize: 2,
        }
    }

    componentDidMount() {
        var x = JSON.parse(localStorage.getItem("token"));
        axios.get('http://localhost:3000/posts/all-posts').then(res => {
            this.setState({ allposts: res.data });
        }).catch((err) => {
            console.log("Error: " + err);
        });
        axios.post('http://localhost:3000/users/auth/', x).then(res => {
            console.log(res.data.userid);
            this.setState({  userid: res.data.userid });
        }).catch((err) => {
            console.log("Error: " + err);
        });
    }

    handleClick = (post) => {
        const allpost = [...this.state.allposts];
        allpost.push(post);
        this.setState({ allpost: allpost });
    }

    onPageChange = (page) => {
        this.setState({currentPage : page.id})
    }

    handleDelete = (id) => {
        console.log(id);
        let posts = [...this.state.allposts];
        posts = posts.filter((post) => {
            console.log(post._id);
            return post._id !== id;
        });
        axios.delete('http://localhost:3000/posts/'+id);
        this.setState({allposts: posts, currentPage: this.state.currentpage-1});
    }

    renderPost = () => {
        let post1 = this.state.allposts;

        const mpost = paginate(post1, this.state.currentPage, this.state.pageSize);

        const a = mpost.map((post) => {
                    return (
                        <Blog content={post} 
                            key={post._id}
                            userid={this.state.userid}
                            handleDelete={this.handleDelete}
                            />
                    );
                })
        console.log(a);
        return a;
    } 

    content = () => {
        console.log(this.state.userid);
        var x = JSON.parse(localStorage.getItem("token"));
        console.log(x);
        if (x !== null) {
            console.log("hiiiii");
            return (
                <div>
                    <nav className="navbar navbar-expand-lg" style={{backgroundColor: "#e3f2fd"}}>
                        <div className="container">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <a className="navbar-brand" href="#">Blog Post</a>

                        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Home</a>
                                </li>
                            </ul>
                            <button className="btn btn-outline-primary ms-auto" type="submit" 
                                onClick={() => window.location = '/'+'create-post' }>
                                Create Post
                            </button>
                            <button className="btn btn-outline-warning ms-1" type="submit"
                                onClick={() => {
                                    localStorage.clear();
                                    window.location = '/';
                                }}>LogOut</button>
                        </div>
                        </div>
                    </nav>
                    { this.renderPost() }
                    <br/>
                    <div className='d-flex justify-content-center'>
                        <Pagination totalpost={this.state.allposts.length}
                                    pageSize={this.state.pageSize}
                                    onPageChange={this.onPageChange}
                                    currentpage={this.state.currentpage}/>
                    </div>
                </div>
            );
        }
        else {
            window.location ='/';
            console.log("abc");
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
 
export default BlogsHome;
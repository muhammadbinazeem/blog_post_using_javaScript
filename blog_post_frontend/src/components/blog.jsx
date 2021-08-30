import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Blog = ({content, userid, handleDelete }) => {
    let disable = 1;
    if (content.userid === userid) {
        disable = 0;
    }

    const onClickk = (id) => {
        handleDelete(id);
    }

    return (
        <div className="container" style={{width: "80%"}}>
            <br/>
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">{content.title}</h5>
                    <h6 class="card-title">{content.username}</h6>
                    <p class="card-text">{content.content}</p>
                    <button href="#" class="btn btn-primary" 
                        disabled={disable}><Link to={"/edit-post/"+content._id} className='link-dark'>Edit</Link></button>
                    <button href="#" class="btn btn-danger ms-2" disabled={disable} 
                        onClick={() => onClickk(content._id)}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Blog;
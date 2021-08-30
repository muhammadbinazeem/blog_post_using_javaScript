import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

const EditBlog = () => {

    const { id } = useParams();

    const [content , setInputField] = useState("");

    const [data, setData] = useState({});

    useEffect(() => {
    
        const fetchData = async () => {
          try {
            await axios.get('http://localhost:3000/posts/'+id).then(res => {
                console.log(res.data);
                setData(res.data);
                setInputField(res.data.content);
            });
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
    }, []);

    const onChangeBlogContent = (e) => {
        e.preventDefault();
        setInputField(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(content);
        axios.patch('http://localhost:3000/posts/'+id, { content: content }).then(res => {
            console.log(res);
        });
        window.location = '/blogs';
    }

    const contentt = () => {
        var x = JSON.parse(localStorage.getItem("token"));
        if (x !== null) {
            return (
                <div className="container mt-5">
                    <h2>Edit Post</h2>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <br/>
                            <input type="text" className="form-control" value={data.title} disabled/>
                        </div>
                        <br/>
                        <div className="form-group">
                            <label>Blog Content</label>
                            <textarea className="form-control" rows="6"
                                    value={content}
                                        onChange={onChangeBlogContent}  />
                        </div>
                        <br/>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-danger btn-block align-center">Done</button>
                        </div>
                    </form>
                </div>
            );
        } else {
            window.location = '/';
        }

    }

    return ( 
        <div>
            {
                contentt()
            }
        </div>
    );
}
 
export default EditBlog;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ErrorBlock = ({ status }) => {
    var showerror = "alert ";
    var error = undefined;
    if (status !== undefined && status === "Sign Up Failed") {
        showerror += "alert-warning";
        error = status;
    }
    if (status !== undefined && status === "fill all values") {
        showerror += "alert-warning";
        error = status;
    }
    return ( 
        <div class={showerror} role="alert">
            {error}
        </div>
    );
}

class SignUp extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        status: undefined,
    }

    onChangeName = (e) => {
        this.setState({ name: e.target.value});
    }

    onChangeEmail = (e) => {
        this.setState({ email: e.target.value});
    }

    onChangePassword = (e) => {
        this.setState({ password: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.name !== '' && this.state.email !== '' && this.state.password !== '') {
            console.log('hi')
            const user = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            };
            axios.post('http://localhost:3000/users/signup', user).then((res) => {
                console.log(res);
                this.setState({status: res.data});
                window.location = '/';
            }).catch((err) => {
                this.setState({ status: "Sign Up Failed"})
            });
        } else {
            this.setState({ status: "fill all values" });
        }
    }

    render() { 
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                <form onSubmit={this.onSubmit}>
                    <h3>Sign Up</h3>
                    <ErrorBlock status={this.state.status}/>
                    <div className="form-group">
                        <label>Full name</label>
                        <input type="text" className="form-control" placeholder="First name" onChange={this.onChangeName}/>
                    </div>
                    <br/>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" onChange={this.onChangeEmail}/>
                    </div>
                    <br/>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" onChange={this.onChangePassword}/>
                    </div>
                    <br/>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                    <p className="forgot-password text-right">
                        Already registered <Link to="/">sign in?</Link>
                    </p>
                </form>
                </div>
            </div>
        );
    }
}
 
export default SignUp;
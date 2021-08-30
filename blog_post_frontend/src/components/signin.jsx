import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ErrorBlock = ({ status }) => {
    var showerror = "alert ";
    var error = undefined;
    if (status !== undefined && status === "not-authenticated") {
        showerror += (status !== "not-authenticated") ? "alert-info" : "alert-warning" ;
        error = (status !== "not-authenticated") ? "Logged in" : "Wrong Credentials";
    }

    if (status !== undefined && status === "Fill All Fields") {
        showerror += "alert-warning" ;
        error = status;
    }

    if (status !== undefined && status === "Sign In Failed") {
        showerror += "alert-warning" ;
        error = status;
    }

    if (status !== undefined && status === "incorrect password") {
        showerror += "alert-warning" ;
        error = status;
    }
    
    return ( 
        <div class={showerror} role="alert">
            {error}
        </div>
    );
}

class SignIn extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        status: undefined,
        token: ''
    }

    onChangeEmail = (e) => {
        const email = e.target.value;
        this.setState({ email: email});
    }

    onChangePassword = (e) => {
        const password = e.target.value;
        this.setState({ password: password});
    }

    onSubmit = (e) => {
        e.preventDefault();

        if (this.state.email !== '' && this.state.password !== '') {
            console.log('hi')
            const user = {
                email: this.state.email,
                password: this.state.password
            };
        
            axios.post('http://localhost:3000/users/signin', user).then((res) => {
                if (res.data !== 'not-authenticated') {
                    console.log(JSON.stringify(res.data));
                    localStorage.setItem('token', JSON.stringify(res.data));
                    window.location = '/blogs';
                } else {
                    this.setState({status : "incorrect password"});        
                }
            }).catch((err) => {
                this.setState({ status: "Sign Ip Failed"})
            });
        } else {
            this.setState({status : "Fill All Fields"});
        }
    }

    render() { 
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={this.onSubmit}>
                        <h3>Sign In</h3>
                        <ErrorBlock status={this.state.status}/>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" 
                                    onChange={this.onChangeEmail} />
                        </div>
                        <br/>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password"
                                onChange={this.onChangePassword}/>
                        </div>
                        <br/>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary btn-block align-center">Submit</button>
                        </div>
                        <div className="d-flex justify-content-center">
                            <p class="psw"><Link to="/signup">Donot Have An Account?</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignIn;
import React, { Component } from 'react'
import axios from 'axios'
import './css/login.scss'
class Login extends Component {
    state = {};

    //handleInputChange keeps track of the imput fields by setting state of username and password
    handleInputChange = (e) => {
        if (e.currentTarget.value) {
            e.currentTarget.style.background="rgba(0, 0, 0, 0.5)";
        }
        const {value, id} = e.currentTarget;
        this.setState({[id]: value})
    }

    //redirect() redirects the user to their home page based on the user role
    redirect = (isAdmin, id) => {
        if(isAdmin) return this.props.history.push('/admin/home')
        this.props.history.push(`user/users/${id}/home`)
    }

    //submitForm() sends the username and password using axios. we should recieve a token which is then stored on local storage. once complete it runs the redirect funtion.
    submitForm = (e) => {
        e.preventDefault();
        let url
        if(window.location.pathname === "/admin") url = `${process.env.REACT_APP_API_URL}/login/admin`;
        if(window.location.pathname === "/") url = `${process.env.REACT_APP_API_URL}/login/user`;

        const { username, password } = this.state        
        const data = { username, password }
        axios.post(url, data)
            .then(resp => { // save token to local storage
                const { token, isAdmin, id } = resp.data
                localStorage.setItem('token', token)
                this.setState({message: 'You are logged in', error: null})
                this.redirect(isAdmin, id)
                })
            .catch(err => {
                if(!err.response) return console.error(err)
                if(err.response.status === 500) return this.props.history.replace('/servererror')
                if(err.response.status === 409) return this.setState({error: 'Username already taken'})
                if(err.response.status === 400) return this.setState({error: 'Incorrect username or password'})
            })
    }

    render() {
        const {error, message} = this.state
        return (
            <>
                <form>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" onChange={this.handleInputChange} />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" onChange={this.handleInputChange}/>
                    { error && <div className="error-msg"><p>{error}</p></div>}
                    <button onClick={this.submitForm}>Login</button>
                </form>
                { message && <p>{message}</p>}
            </>
        )
    }
}

export default Login;
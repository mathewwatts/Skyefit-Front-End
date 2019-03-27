import React, { Component } from 'react'
import axios from 'axios'
import UserCard from './UserCard'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import './css/listuser.scss'
// import PrintUserCards from './PrintUserCards';

class ListUsers extends Component {
  state = {};
    
  //when component mounts we send a request for the users and send through the token in the headers. with the response we set state of users to the response.
  componentDidMount() {
        const config = { headers: {token: localStorage.getItem('token')}}
        axios.get(`${process.env.REACT_APP_API_URL}/admin/users`, config)
            .then(resp => this.setState({users: resp.data, filteredUsers: resp.data}))
            .catch(err => {
                if(!err.response) return console.error(err)
                if(err.response.status === 500) return this.props.history.replace('/servererror')
                if(err.response.status === 401 || err.response.status === 403) return this.props.history.replace('/admin')
                if(err.response.status === 404) return this.setState({message: "Users not found"})
            });
  }

  handleSearch = (input) => {
    const { users } = this.state
    // Lower case the desired search
    const search = input.toLowerCase()

    if(!users) return null
    let filteredUsers = users.filter(user => {
        // Check the desired search with the first and last name of the user
        if(user.personalAttribute.firstName.toLowerCase().includes(search) || user.personalAttribute.lastName.toLowerCase().includes(search)) return user
        return null
    })

    if(filteredUsers.length === 0) {
        this.setState({filteredUsers: null})
    } else {
        this.setState({ filteredUsers })
    }
  }
    
  //with each user in the users array, we will render a UserCard component passing id, firstname and lastname as props. if there is no users it will render loading...
  render() {

    const {users, filteredUsers, message} = this.state;
    if(message) return <h1>{message}</h1>
    if(!users) return <h1>Loading...</h1>
    return (
        <div className="list-user">
        <div className="background" id="admin-users">
          <p id="logo-type">SkyeFIT</p>
            <div className="main-container">
                <div className="content-container">
                <h1>Clients:</h1>
                <SearchBar search={this.handleSearch}/>
                    {!users[0] && <p>There are no users</p>}
                    {filteredUsers &&
                    filteredUsers.map(user => {
                        return (
                            <div key={user._id}>
                                <UserCard
                                key={user._id}
                                id={user._id}
                                image={user.image}
                                firstName={user.personalAttribute.firstName}
                                lastName={user.personalAttribute.lastName}
                                />
                            </div>
                    )})}
                    <Link className="button" to="/admin/new-user">Add User</Link>
                </div>
            </div>
        </div>
        </div>
    )
  }
}

export default ListUsers
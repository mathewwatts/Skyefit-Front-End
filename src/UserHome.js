import React, { Component } from 'react'
import axios from 'axios';
import profilePic from "./assets/img/default-profile-pic.jpg"

import './css/userhome.scss';
class UserHome extends Component {
  state = {};
    
  componentDidMount() {
    const config = { headers: {token: localStorage.getItem('token')}}
    const { id } = this.props.match.params
    axios.get(`${process.env.REACT_APP_API_URL}/user/users/${id}`, config)
      .then(resp => this.setState({user: resp.data}))
      .catch(err => {
        if(!err.response) return console.error(err)
        if(err.response.status === 500) return this.props.history.replace('/servererror')
        if(err.response.status === 401 || err.response.status === 403) return this.props.history.replace('/')
        if(err.response.status === 404) return this.setState({error: "Invalid user"})
      });
  }

  compareDate = (a,b) => {
    if(a.date < b.date) return -1;
    if(a.date > b.date) return 1;
    return 0;
  }

  upComingSess = () => {
    const {sessions} = this.state.user

    sessions.sort(this.compareDate)

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if(dd < 10) dd = '0' + dd;
    if(mm < 10) mm = '0' + mm;

    today = yyyy + '-' + mm + '-' + dd ;
    const upComingSess = sessions.filter(session => session.date > today)
    return upComingSess[0]
  }

  render() {
    const {user, error} = this.state;
    if(error) return <h1>{error}</h1>
    if(!user) return <h1>Loading...</h1>
    const nextSession = this.upComingSess()
    return (
      <div className="background" id="user-home">
        <p id="logo-type">SkyeFIT</p>
          <div className="main-container">
            <div className="content-container">
              <h1>Welcome</h1>
              {user.image && <img src={user.image} alt={user.personalAttribute.firstName}/>}
              {!user.image && <img src={profilePic} alt={user.personalAttribute.firstName}/>}
              <h3>{user.personalAttribute.firstName}</h3>
              {nextSession && <p>Your next session is: <br/> {nextSession.date.split('-').reverse().join('/')} {nextSession.time} {nextSession.location}</p>}
            </div>
          </div>
      </div>
    )
  }
}

export default UserHome;


import React, { Component } from 'react'
import './css/adminhome.scss';
import profilePic from "./assets/img/Skye.png"
import decode from 'jwt-decode'
import axios from 'axios'


export default class AdminHome extends Component {
  state ={}
  componentDidMount =() => {
    const decoded = decode(localStorage.getItem('token'));
    if(decoded.username !== 'admin') return this.props.history.replace('/admin')
    const url = `${process.env.REACT_APP_API_URL}/admin/admin`
    const config = { headers: {token: localStorage.getItem('token')}}
    axios.get(url, config)
      .then(resp => this.setState({user: resp.data}))
      .catch(err => {
        if(!err.response) return console.error(err)
        if(err.response.status === 500) return this.props.history.replace('/servererror')
        if(err.response.status === 401 || err.response.status === 403  || err.response.status === 404) return this.props.history.replace('/admin')
      })
  }

  compareDate = (a,b) => {
    if(a.date < b.date) return -1
    if(a.date > b.date) return 1
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
    const {user} = this.state
    if(!user) return <h1>Loading ...</h1>
    const nextSess = this.upComingSess()
    return (
      <div className="background" id="admin-home">
        <p id="logo-type">SkyeFIT</p>
          <div className="main-container">
            <div className="adminhome-container">
              <h1>Welcome</h1>
                <img src={profilePic} alt="Skye"/>
              <div className="adminhome-container">
                <h3>Skye</h3>
                {nextSess && <p>Your next session is: <br/> {nextSess.date.split('-').reverse().join('/')} {nextSess.time} {nextSess.location}</p>}
              </div>
            </div>
          </div>
      </div>
    )
  }
}

import React, { Component } from 'react'
import axios from 'axios';
import './css/calendar.scss'
import moment from 'moment';

import Calendar from './Calendar'

class UserSessions extends Component {
  state = {}

  onDayClick = (e, dateContext) => {
    const {sessions} = this.state
    const selectedSessions = sessions.filter(date => moment(date.date).isSame(dateContext))
    selectedSessions.sort(this.compareTime)
    this.setState({selectedSessions})
  }

  compareTime = (a,b) => {
    if (a.time < b.time)
      return -1;
    if (a.time > b.time)
      return 1;
    return 0;
  }

  displayCurrentDate = () => {
    const currentDate = moment().format("mm","dd")
    this.setState({currentDate})
  }

  compareDate = (a,b) => {
    if(a.date < b.date) return -1;
    if(a.date > b.date) return 1;
    return 0;
  }
    
  componentDidMount() {
    const config = { headers: {token: localStorage.getItem('token')}}
    const { id } = this.props.match.params
    axios.get(`${process.env.REACT_APP_API_URL}/user/users/${id}`, config)
      .then(resp => {
        const {sessions} = resp.data
        sessions.sort(this.compareDate)
        this.setState({sessions}, () => {
          let today = new Date();
          let dd = today.getDate();
          let mm = today.getMonth() + 1; //January is 0!
          let yyyy = today.getFullYear();

          if(dd < 10) dd = '0' + dd;
          if(mm < 10) mm = '0' + mm;

          today = yyyy + '-' + mm + '-' + dd ;
          const upComingSess = this.state.sessions.filter(session => session.date > today)
          this.setState({upComingSess})
        })
      })
      .catch(err => {
        if(!err.response) return console.error(err)
        if(err.response.status === 500) return this.props.history.replace('/servererror')
        if(err.response.status === 401 || err.response.status === 403) return this.props.history.replace('/')
        if(err.response.status === 404) return this.setState({error: "Invalid user"})
      });
  }

  render() {
    const {sessions, upComingSess, selectedSessions } = this.state;
    if(!sessions) return <h1>Loading...</h1>
    return (
      <div className="background" id="user-sessions">
        <p id="logo-type">SkyeFIT</p>
        <div className="main-container">
          <div className="content-container">
            <h1>Sessions</h1>
              <div>
                <p>Next Session:</p>
                {upComingSess && upComingSess[0] && <p>{upComingSess[0].date.split('-').reverse().join('/')}</p>}
                {upComingSess && !upComingSess[0] && <p>No upcoming sessions</p>}
              </div>
              <div className="calendar-container">
                <Calendar 
                  sessions={sessions}
                  width="302px"
                  onDayClick={(e, day)=> 
                  this.onDayClick(e, day)}/>
                <div className="card-cont">
                {!selectedSessions && <p>There are no sessions on this day!</p>}
                {selectedSessions && !selectedSessions[0] && <p>There are no sessions on this day!</p>}
                {selectedSessions &&
                  selectedSessions.map(session => {
                    return (
                      <div key={session.firstName} className="sess-card">
                        <p>time: {session.time} </p>
                        <p>location: {session.location}</p>
                      </div>
                    )
                  })
                }
                </div>
              </div>
          </div>
        </div>
      </div>
    )
  }  
}

export default UserSessions;
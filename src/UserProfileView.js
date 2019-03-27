import React, { Component } from 'react'
import axios from 'axios';
import PrintKeyValue from './PrintKeyValue';
import PrintPersonalDetails from './PrintPersonalDetails'
import PrintContactDetails from './PrintContactDetails';
import AccountDetailForm from './AccountDetailForm';
import PrintPersonalAttributes from './PrintPersonalAttributes';
import './css/userprofile.scss';
import UpdatePassword from './UpdatePassword'
import profilePic from "./assets/img/default-profile-pic.jpg"

class UserProfileView extends Component {
  state = {};

  //when component mounts a get request for a single user is triggered and the user state is set to the data that comes back.
  componentDidMount(){
    // const url = `http://localhost:5000/admin/users/${this.props.match.params.id}`
    // const config = { headers: {token: localStorage.getItem('token')}}

    // axios.get(url, config)
    this.getUser()
      .then(resp => {
        this.setState({user: resp.data}, () => {
          this.setState({ 
            editNotesBtnMsg: 'Edit Notes',
            contactDetailsBtnMsg: 'Edit'
          })
        })
      })
      .catch(err => {
        if(!err.response) return console.error(err)
        if(err.response.status === 500) return this.props.history.replace('/servererror')
        if(err.response.status === 401 || err.response.status === 403) return this.props.history.replace('/')
        if(err.response.status === 404) return this.setState({error: "Invalid user"})
      });
  }

  getUser = () => {
    const url = `${process.env.REACT_APP_API_URL}/user/users/${this.props.match.params.id}`
    const config = { headers: {token: localStorage.getItem('token')}}

    return axios.get(url, config)
  }


  //showTransactions() runs when the button is clicked
  showTransactions = (e) => {
    e.preventDefault();//this prevents the default reload
    const { transactionalHistory } = this.state.user //we get the transactional history from the user in state
    const { transactionBtn } = this.state //we get transaction btn from state, currently undefined
    const printTransaction = transactionalHistory.map(transaction => <PrintKeyValue obj={transaction} key={transaction.date}/>)//iterate through the transactional history array and create a new array of PrintKeyValue components

    if(!transactionBtn){//we are checking if transaction is a falsy value
      return this.setState({ printTransaction, transactionBtn: true })//setting state of printTransaction and toggling the transaction Btn. setting state with triger render again.
    } 
    this.setState({printTransaction: null, transactionBtn: false})//the second click will give a truthy value for transactionbtn so this will run and set printTransaction to null and again toggles the transaction Btn. This will hide the rendered component.
  }

  redirectMealPlan = () => {
    const {id} = this.props.match.params
    this.props.history.push(`/admin/users/${id}/new-mealplan`)
  }
  redirectCurrentPlan = () => {
    const {id} = this.props.match.params
    this.props.history.push(`/user/users/${id}/mealplan`)
  }

  editNotes = () => {
    const { editNotesBtn } = this.state
    if(!editNotesBtn) this.setState({ editNotesBtn: true, editNotesBtnMsg: 'Cancel'})
    if(editNotesBtn) {
      this.getUser()
      .then(resp => this.setState({ user: resp.data, editNotesBtn: false, editNotesBtnMsg: 'Edit Notes'}))
      .catch(err => {
        if(!err.response) return console.error(err)
        if(err.response.status === 500) return this.props.history.replace('/servererror')
        if(err.response.status === 401 || err.response.status === 403) return this.props.history.replace('/')
        if(err.response.status === 404) return this.setState({error: "Invalid user"})
      });
    }
  }

  editContactDetails = () => {
    const { editContactDetailsBtn } = this.state
    if(!editContactDetailsBtn) this.setState({ editContactDetailsBtn: true, contactDetailsBtnMsg: 'Cancel'})
    if(editContactDetailsBtn) {
      this.getUser()
      .then(resp => this.setState({ user: resp.data, editContactDetailsBtn: false, contactDetailsBtnMsg: 'Edit'}))
      .catch(err => {
        if(!err.response) return console.error(err)
        if(err.response.status === 500) return this.props.history.replace('/servererror')
        if(err.response.status === 401 || err.response.status === 403) return this.props.history.replace('/')
        if(err.response.status === 404) return this.setState({error: "Invalid user"})
      });
    }
  }

  persAttInputChange = (e) => {
    const {value, id} = e.currentTarget;
    const {personalAttribute} = this.state.user
    personalAttribute[id] = value
    this.setState({personalAttribute})
  }

  handleInputChange = (e) => {
    const {value, id} = e.currentTarget
    if(id === 'username' || id === 'notes' || id === 'dietaryRequirements') {
      const {user} = this.state
      user[id] = value
      this.setState({user})
    } else {
      const {contact} = this.state.user
      contact[id] = value
      this.setState({contact})
    }
    if (e.currentTarget.value) {
      e.currentTarget.style.background="rgba(0, 0, 0, 0.5)";
    }
  }

  updateAttr = (id, value) => {
    if(id === 'weightLog'){
      const {personalAttribute} = this.state.user
      personalAttribute[id].push(value)
      this.setState({personalAttribute})
      this.saveEdit()
    }
    const {personalAttribute} = this.state.user
    personalAttribute[id] = value 
    this.setState({personalAttribute})
    this.saveEdit()
  }

  deleteUser = (e) => {
    e.preventDefault()
    const url = `${process.env.REACT_APP_API_URL}/admin/users/delete`
    const data = {
      id: this.state.user._id
    }
    axios.delete(url, {headers: {token: localStorage.getItem('token')}, data})
      .then(resp => {
        if(resp.data.message === 'User successfully deleted') this.setState({deleteConfirm: true})
      })
      .catch(err => {
        if(!err.response) return console.error(err)
        if(err.response.status === 500) return this.props.history.replace('/servererror')
        if(err.response.status === 401 || err.response.status === 403) return this.props.history.replace('/')
        if(err.response.status === 404) return this.setState({error: "Invalid user"})
      })
  }

  saveEdit = (btn, btnmsg) => {
    const {user} = this.state
    this.setState({[btn]: false, [btnmsg]: 'Edit'})
    const config = { headers: {token: localStorage.getItem('token')}}
    const url = `${process.env.REACT_APP_API_URL}/admin/users/edit`
    const data = { user }
    axios.put(url, data, config)
      .then(resp => this.setState({user: resp.data}))
      .catch(err => {
        if(!err.response) return console.error(err)
        if(err.response.status === 500) return this.props.history.replace('/servererror')
        if(err.response.status === 401 || err.response.status === 403) return this.props.history.replace('/')
        if(err.response.status === 404) return this.setState({error: "Invalid user"})
      })
  }

  setBodyFat = (bodyFat, fatMass, leanMass) => {
    const {personalAttribute} = this.state.user
    personalAttribute.bodyFatLog.push(bodyFat)
    personalAttribute.fatMass.push(fatMass)
    personalAttribute.leanMass.push(leanMass)
    this.setState({personalAttribute}, () => this.saveEdit())
  }

  toggleEditPassword = () => {
      const {editPassword} = this.state
      if(!editPassword) return this.setState({editPassword: true})
      this.setState({editPassword: false})
  }

  updatePassword = (password) => {
    const config = { headers: {token: localStorage.getItem('token')}}
    const data = {newPassword: password}
    const url = `${process.env.REACT_APP_API_URL}/user/users/updatepassword`
    axios.put(url, data, config)
      .then(resp => this.setState({user: resp.data}, () => this.toggleEditPassword()))
      .catch(err => {
        if(!err.response) return console.error(err)
        if(err.response.status === 500) return this.props.history.replace('/servererror')
        if(err.response.status === 401 || err.response.status === 403) return this.props.history.replace('/')
        if(err.response.status === 404) return this.setState({error: "Invalid user"})
      })
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
    const { user, editPersonalDetailsBtn, editContactDetailsBtn, contactDetailsBtnMsg, editPassword } = this.state;
    if(!user) return <h1>Loading...</h1>
    const nextSess = this.upComingSess()
    return (
      <div className="background" id="user-profile">
        <p id="logo-type">SkyeFIT</p>
        <div className="user-profile">
          <div className="main-container">
            <div className="content-container">

            <div className="column">

              <div className="top-row personal-info">
                <div className="title">
                  <h1>Personal Info</h1>
                </div>
                  {user.image && <img src={user.image} alt={user.personalAttribute.firstName}/>}
                  {!user.image && <img src={profilePic} alt={user.personalAttribute.firstName}/>}
                  { !editPersonalDetailsBtn && <PrintPersonalDetails obj={user.personalAttribute} key={user._id}/>}
                  { user.sessions && user.sessions[0] && <div className="box">
                  <p>Next Sessions: </p><p>{nextSess.date.split('-').reverse().join('/')} {nextSess.time} {nextSess.location}</p></div>}
                  { user.remainingSessions && <div className="box">
                  <p>Remaining Sessions: </p><p>{user.remainingSessions}</p>
                  </div>}
              </div>


                <div className="top-row contact">
                  <div className="title">
                    <h1>Contact Details</h1>
                    <button onClick={this.editContactDetails}>{contactDetailsBtnMsg}</button>
                  </div>
                  { !editContactDetailsBtn && <PrintContactDetails obj={user.contact}/>}
                  { editContactDetailsBtn && <AccountDetailForm 
                        handleInputChange={this.handleInputChange}
                        username={user.username}
                        email={user.contact.email}
                        contactNumber={user.contact.contactNumber}
                        edit={true}/>}
                  { editContactDetailsBtn && <button onClick={() => this.saveEdit('editContactDetailsBtn', 'contactDetailsBtnMsg')}>Save</button>}
                </div>

              <div className="directory">
                <div>
                  <button onClick={this.toggleEditPassword}>Update Password</button>
                  <button onClick={this.redirectCurrentPlan}>Current Meal Plan</button>
                </div>
                {editPassword && <UpdatePassword updatePassword={this.updatePassword}/>}
              </div>
            </div>

              <div className="column personal-att">
              <div className="title">
                  <h1>Personal Attributes</h1>
                </div>
                <PrintPersonalAttributes 
                      obj={user.personalAttribute} 
                      updateAttr={this.updateAttr}
                      setBodyFat={this.setBodyFat}
                      user={true}/>
              </div>
          
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfileView;
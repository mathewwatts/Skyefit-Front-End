import React, { Component } from 'react'
import homeIcon from "./assets/icons/home.svg"
import mealIcon from "./assets/icons/mealplan.svg"
import exerciseIcon from "./assets/icons/sessions.svg"
import { Link, withRouter } from "react-router-dom"
import userIcon from "./assets/icons/users.svg"
import './css/navbar.scss'
import decode from 'jwt-decode'

class UserMenu extends Component {
  constructor() {
    super()
    
    this.state = {
      showMenu: false,
    }
    
    this.showMenu = this.showMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
  }
  
  showMenu(event) {
    event.preventDefault()
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu)
    })
  }
  
  closeMenu() {
    if (this.dropdownMenu) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu)
      })   
    }
  }

  deleteToken = () => {
    // when user clicks log-out, delete token
    localStorage.removeItem("token")
    // then redirect them back to log-in page
    // this.props.history.replace('/')
  }

  render() {
    if(!localStorage.getItem('token')) return this.props.history.replace('/')
    const decoded = decode(localStorage.getItem('token'))
    const id = decoded.id
    const homePageLink = `/user/users/${id}/home`
    const mealPlanLink = `/user/users/${id}/mealplan`
    const sessionsLink = `/user/users/${id}/sessions`
    const profileLink = `/user/users/${id}/profile`

    return (
      <div>
        {
          this.state.showMenu
            ? (
              <div
                className="menu-window"
                ref={(element) => {
                  this.dropdownMenu = element
                }}
              >
                <div className="menu-content">
                  <Link to={homePageLink} className="menu-item" onClick={this.closeMenu}>Home</Link>
                  <img id="menu-icon" src={homeIcon} alt="Home Icon"></img>
                  <Link to={mealPlanLink} className="menu-item" onClick={this.closeMenu}>Meal Plan</Link>
                  <img id="menu-icon" src={mealIcon} alt="Meal Plan Icon"></img>
                  <Link to={sessionsLink} className="menu-item" onClick={this.closeMenu}>Sessions</Link>
                  <img id="menu-icon" src={exerciseIcon} alt="Sessions Icon"></img>
                  <Link to={profileLink} className="menu-item" onClick={this.closeMenu}>Profile</Link>
                  <img id="menu-icon" src={userIcon} alt="Profile Icon"></img>
                  <Link to="/" className="menu-item" onClick={this.deleteToken}>Log Out</Link>
                  {/* <p className="menu-item" onClick={this.deleteToken} alt="Log Out">Log Out</p> */}
                </div>
              </div>
            )
            : (
              null
            )
        }
        <div className="menu-background">
          <div className="menu-textbox"><p id="nav-text" onClick={this.showMenu} alt="Menu">MENU</p></div>
        </div>
      </div>
    )
  }
}

export default withRouter(UserMenu)

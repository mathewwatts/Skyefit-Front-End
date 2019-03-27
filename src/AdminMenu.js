import React, { Component } from 'react';
import homeIcon from "./assets/icons/home.svg"
import userIcon from "./assets/icons/users.svg"
import addUser from "./assets/icons/adduser.svg"
import exerciseIcon from "./assets/icons/sessions.svg"
import './css/navbar.scss';
import { Link, withRouter } from "react-router-dom";

class AdminMenu extends Component {
  constructor() {
    super();
    
    this.state = {
      showMenu: false,
    };
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  
  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu() {
    if (this.dropdownMenu) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu)
      })   
    }
  }

  deleteToken = () => {
    localStorage.removeItem("token")
  }

  render() {
    return (
      <div>
        {
          this.state.showMenu
            ? (
              <div
                className="menu-window"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                <div className="menu-content">
                  <Link to="/admin/home" className="menu-item" onClick={this.closeMenu}>Home</Link>
                  <img id="menu-icon" src={homeIcon} alt="Home Icon"></img>

                  <Link to="/admin/users" className="menu-item" onClick={this.closeMenu}>Users</Link>
                  <img id="menu-icon" src={userIcon} alt="Users Icon"></img>

                  <Link to="/admin/new-user" className="menu-item" onClick={this.closeMenu}>Add New User</Link>
                  <img id="menu-icon" src={addUser} alt="Add User Icon"></img>

                  <Link to="/admin/sessions" className="menu-item" onClick={this.closeMenu}>Sessions</Link>
                  <img id="menu-icon" src={exerciseIcon} alt="Sessions Icon"></img>

                  <Link to="/admin" className="menu-item" onClick={this.deleteToken}>Log Out</Link>
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
    );
  }
}

export default withRouter(AdminMenu);
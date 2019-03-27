import React from 'react';
import Login from './Login';
import logo from "./assets/icons/skyefit_logo.svg"
import './css/adminlogin.scss';

const AdminLogin = (props) => {
  return (
    <div className="background" id="admin-login">
      <p id="logo-type">SkyeFIT</p>
        <div className="main-container">
          <div className="content-container">
              <div className="top-container">
                <img id="logo" src={logo} alt="SkyeFIT Logo"></img>
                <h2>Welcome Skye</h2>
              </div>
            <Login history={props.history}/>
          </div>
        </div>
    </div>    
  )
}

export default AdminLogin;
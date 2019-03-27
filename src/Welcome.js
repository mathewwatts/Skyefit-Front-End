import React, { Component } from 'react'
import logo from "./assets/icons/skyefit_logo.svg"
import Login from './Login'
import LoginSlider from './LoginSlider'
import './css/welcome.scss'

// change to functional component because we don't need to change state on this page
class Welcome extends Component {
  state = {
    btnText: "Show Features"
  };

  // showLogInForm() runs when the button is clicked
  showLogInForm = (e) => {
    e.preventDefault(); // this prevents the default reload
    const printLogin = <Login history={this.props.history}/> // the button sets state to the Login component
    this.setState({ printLogin }) 
  }

  showLoginSlider = (e) => {
    const { featuresBtn } = this.state
    e.preventDefault()
    const printSlider = <LoginSlider />
    // this.setState({ printSlider }) 

    if(!featuresBtn){
      return this.setState({ printSlider, featuresBtn: true, btnText: "Hide Features" }) //setting state of printSlider and toggling the features Btn. setting state will triger render again.
    } 
    this.setState({printSlider: null, featuresBtn: false, btnText: "Show Features"}) //the second click will give a truthy value for featuresBtn so this will run and set printSlider to null and again toggles the features Btn. This will hide the rendered component.
  }

  render() {
    const { printLogin, btnText, printSlider } = this.state // we need to access printLogin from state so it can be rendered
    const fromRoute = window.location.search
    return (
      <div className="background" id="welcome">
        <p id="logo-type">SkyeFIT</p>
          <div className="main-container">
            <div className="welcome-container">
              { !printSlider && <img id="logo" src={logo} alt="SkyeFIT Logo"></img>}
              { printLogin && printSlider && <img id="logo" src={logo} alt="SkyeFIT Logo"></img>}
              { !printLogin && !printSlider && <div><p>Welcome to</p><h1>SkyeFIT</h1></div> }
              { printSlider && !printLogin && <>{printSlider}</>}
              { !printLogin && <button className="small" onClick={this.showLoginSlider}>{btnText}</button> }
              { fromRoute === "?login" && <h4>Please Login</h4>}
              { !printLogin && <button onClick={this.showLogInForm}>Log In</button> }
              { printLogin && <>{printLogin}</> }
            </div>
          </div>
      </div>      
    )
  }
}

export default Welcome;
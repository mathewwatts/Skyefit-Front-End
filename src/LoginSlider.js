import React, { Component } from 'react'
import mealIcon from "./assets/icons/good-diet-svgrepo-com.svg"
import exerciseIcon from "./assets/icons/exercise-svgrepo-com.svg"
import progressIcon from "./assets/icons/graphic-progression-svgrepo-com.svg"

class LoginSlider extends Component {
  state = {};

  render() {
    return (
      <>
        <img id="icon" src={mealIcon} alt="Meal Plan Icon"></img>
        <p>Easily follow your meal plan</p>
        <img id="icon" src={exerciseIcon} alt="Sessions Icon"></img>
        <p>View your upcoming sessions</p>
        <img id="icon" src={progressIcon} alt="Progress Icon"></img>
        <p>Track your progress</p>
      </>
    )
  }
}

export default LoginSlider;
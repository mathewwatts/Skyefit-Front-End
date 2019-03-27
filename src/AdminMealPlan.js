import React, { Component } from 'react'
import axios from 'axios';
import './css/displaymealplan.scss'
import ShowMeals from './ShowMeals'

class AdminMealPlan extends Component {
  state = {
    dayOneBtn: true,
    dayTwoBtn: true,
    dayThreeBtn: true,
    dayFourBtn: true,
    dayFiveBtn: true,
    daySixBtn: true,
    daySevenBtn: true
  }
    
  componentDidMount() {
    const config = { headers: {token: localStorage.getItem('token')}}
    const { id } = this.props.match.params
    axios.get(`${process.env.REACT_APP_API_URL}/admin/users/${id}`, config)
      .then(resp => {
        this.setState({mealPlan: resp.data.mealPlans[resp.data.mealPlans.length - 1]})})
      .catch(err => {
        if(!err.response) return console.error(err)
        if(err.response.status === 500) return this.props.history.replace('/servererror')
        if(err.response.status === 401 || err.response.status === 403) return this.props.history.replace('/admin')
        if(err.response.status === 404) return this.setState({message: "User not valid"})
      });
  }

  showMeals = (dayNum) => {
    const {mealPlan} = this.state
    const day = `day${dayNum}`
    this.setState({showMealPlan: <ShowMeals meals={mealPlan[day]}/>, addMealBtn: false})
  }

  render() {
    const {mealPlan, dayOneBtn, dayTwoBtn, dayThreeBtn, dayFourBtn, dayFiveBtn, daySixBtn, daySevenBtn, showMealPlan, message } = this.state;
    if(message) return <h1>{message}</h1>
    if(!mealPlan) return (
      <div className="background" id="meal-plan-image">
        <div className="main-container">
          <div className="content-container">
            <h1>There is no meal plans</h1>
            <div className="btns">
              <button onClick={() => this.props.history.goBack()}>back</button>
              <button onClick={() => this.props.history.replace(`/admin/users/${this.props.match.params.id}/new-mealplan`)}>Add Meal Plan</button>
            </div>
          </div>
        </div>
      </div>
    )
    return (
      <div className="background" id="meal-plan-image">
        <p id="logo-type">SkyeFIT</p>
          <div className="main-container">
            <div className="content-container">
              <h1>Meal Plan <br/><button onClick={() => this.props.history.goBack()}>back</button></h1>
              <div className="btn-container">
                { dayOneBtn && <button onClick={() => this.showMeals(1)}>Day 1</button>}
                { dayTwoBtn && <button onClick={() => this.showMeals(2)}>Day 2</button>}
                { dayThreeBtn && <button onClick={() => this.showMeals(3)}>Day 3</button>}
                { dayFourBtn && <button onClick={() => this.showMeals(4)}>Day 4</button>}
                { dayFiveBtn && <button onClick={() => this.showMeals(5)}>Day 5</button>}
                { daySixBtn && <button onClick={() => this.showMeals(6)}>Day 6</button>}
                { daySevenBtn && <button onClick={() => this.showMeals(7)}>Day 7</button>}
                { showMealPlan && <>{showMealPlan}</>}
              </div>
          </div>
        </div>
      </div>      
    )
  }  
}

export default AdminMealPlan;
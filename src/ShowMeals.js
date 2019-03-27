import React, { Component } from 'react';
import SingleMeal from './SingleMeal';
import './css/showmeals.scss'

class ShowMeals extends Component {
  render() {
    const {meals} =  this.props
    return (
      <div className="meal-plan-container">
        {
          meals.map((meal, i) => {
            return (
              <>
              <h4>Meal {i + 1}</h4>
              <SingleMeal meal={meal} />
              </>
            )
          })
        }
      </div>
    );
  }
}

export default ShowMeals;

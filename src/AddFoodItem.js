import React, { Component } from 'react'
// import Axios from '../../feelthemernbe/node_modules/axios';
import axios from 'axios'

export default class AddFoodItem extends Component {
  state = {
    inputValue: ''
  };  

  handleChange = (e) => {
    const { value } = e.currentTarget;

    this.setState({ inputValue: value })

    // Headers that contain API key and Id
    const headers = {
      headers: {
        'x-app-id': process.env.REACT_APP_NUTRITIONIX_APP_ID,
        'x-app-key': process.env.REACT_APP_NUTRITIONIX_APP_KEY
      }
    }

    // Querying the API with user input
    axios.get(`https://trackapi.nutritionix.com/v2/search/instant?query=${value}`, headers)
      .then(resp => this.setState({ foods: resp.data.common}))
      .catch(err => {
        if(!err.response) return console.error(err)
        if(err.response.status === 500) return this.props.history.replace('/servererror')
      })
  }

  setItem = (food) => {
    this.setState({ inputValue: food.food_name})
  }

  submitFood = (e) => {
    e.preventDefault()
    // this.props.addFoodToMeal(this.state.inputValue)

    const payload = {
      query: this.state.inputValue
    }

    const config = { headers: {token: localStorage.getItem('token')}}

    axios.post(`${process.env.REACT_APP_API_URL}/admin/macros`, payload, config)
      .then(resp => {
        this.props.addFoodToMeal(resp.data.foods[0])
      })
      .catch(err => {
        if(!err.response) return console.error(err)
        if(err.response.status === 500) return this.props.history.replace('/servererror')
        if(err.response.status === 401 || err.response.status === 403) return this.props.history.replace('/')
      })

    e.target.previousSibling.value = ''//empties the input field when submitted
    this.setState({ foods: null})
  }

  render() {
    const { foods } = this.state
    return (
      <div className="addfood">
        <form>
          <div>
          <label htmlFor="foodItem">Food Item:</label>
          <input type="text" id="foodItem" value={this.state.inputValue} onChange={this.handleChange}/>
          <button onClick={this.submitFood}>+</button>
          </div>
          {/* {foods && <div className="foodlist">} */}
            {foods && <div className="foodlist">{foods.map((food, i) => {
              return(
                <p key={i} onClick={() => this.setItem(food)}>{food.serving_unit} {food.food_name}</p>
              )
            })}</div>}
          {/* {foods && </div>} */}
        </form>
      </div>
    )
  }
}


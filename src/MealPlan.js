import React, { Component } from 'react'
import Meal from './Meal'
import DisplayMeal from './DisplayMeal'
import axios from 'axios'
import "./css/mealplan.scss"

export default class MealPlan extends Component {
    state = {
        formPage: 1,
        mealPlan: {
            day1:[],
            day2:[],
            day3:[],
            day4:[],
            day5:[],
            day6:[],
            day7:[]
        },
        mealSaved: true
    };

    submitForm = (e) => {
        e.preventDefault()
        const config = { headers: {token: localStorage.getItem('token')}}
        const url = `${process.env.REACT_APP_API_URL}/admin/users/editmealplan`
        const { mealPlan } = this.state
        const {id} = this.props.match.params
        const data = { mealPlan, id }
        axios.put(url, data, config)
            .then(resp => {
                this.props.history.replace(`/admin/users/${resp.data._id}/mealplan`)})
            .catch(err => {
                if(!err.response) return console.error(err)
                if(err.response.status === 500) return this.props.history.replace('/servererror')
                if(err.response.status === 401 || err.response.status === 403) return this.props.history.replace('/admin')
                if(err.response.status === 404) return this.setState({error404: "Users not found"})
                if(err.response.status === 400) return this.setState({error: 'Could Not Save'})
            })
    }

    deleteMeal = (day, i) => {
        // const dayIndex = day.split('').pop()
        const { mealPlan } = this.state
        mealPlan[day].splice(i, 1)
        this.setState({ mealPlan })
        // Hello, this is Lili!
        // If I mutate state or anything similar
        // I WILL copy the value, mutate that
        // AND THEN setState...I promise
    }

    deleteFood = (day, mealIndex, foodIndex) => {
        //day: [[{}],[{},{}]] got to find the meal array the food is in day[x] => get array back
        //then find the food item in the meal array mealPlan[day][mealIndex].splice[foodIndex, 1]
        const {mealPlan} = this.state
        mealPlan[day][mealIndex].splice(foodIndex, 1)
        if(mealPlan[day][mealIndex].length === 0) mealPlan[day].splice(mealIndex, 1)
        this.setState({mealPlan})
    }

    addMealtoDay = (meal) => {
        const {formPage, mealPlan} = this.state
        const day = `day${formPage}`

        mealPlan[day].push(meal)
        
        this.mealSavedTrue()
        this.setState({message: null})
    }

    componentDidMount() {
        const formPage = 1
        const a = "currentPage"
        this.setState({ formPage, a })
    }

    nextForm = (e) => {
        e.preventDefault();
        const { formPage, mealSaved } = this.state;
        
        if(!mealSaved) return this.setState({message: "You need to save meal first"})

        const newformPage = formPage + 1
  
        this.setState({ formPage: newformPage}, () => {
            this.changeClassNext()
        }) 
    }

    backForm = (e) => {
        e.preventDefault();
        const { formPage, mealSaved } = this.state;
        
        if(!mealSaved) return this.setState({message: "You need to save meal first"})

        const newformPage = formPage - 1
        this.setState({ formPage: newformPage }, () => {
            this.changeClassBack()
        }) 
    }

    changeClassNext = () => {
        const { formPage } = this.state
        if(formPage === 2) return this.setState({ a: null, b: "currentPage"})
        if(formPage === 3) return this.setState({ b: null, c: "currentPage"})
        if(formPage === 4) return this.setState({ c: null, d: "currentPage"})
        if(formPage === 5) return this.setState({ d: null, e: "currentPage"})
        if(formPage === 6) return this.setState({ e: null, f: "currentPage"})
        if(formPage === 7) return this.setState({ f: null, g: "currentPage"})
    }

    changeClassBack = () => {
        const { formPage } = this.state
        if(formPage === 1) return this.setState({ b: null, a: "currentPage"})
        if(formPage === 2) return this.setState({ c: null, b: "currentPage"})
        if(formPage === 3) return this.setState({ d: null, c: "currentPage"})
        if(formPage === 4) return this.setState({ e: null, d: "currentPage"})
        if(formPage === 5) return this.setState({ f: null, e: "currentPage"})
        if(formPage === 6) return this.setState({ g: null, f: "currentPage"})
    }

    redirectUser = () => {
        this.props.history.goBack()
    }

    mealSavedTrue = () => {
        this.setState({mealSaved: true, message: null})
    }

    mealSavedFalse = () => {
        this.setState({mealSaved: false, message: null})
    }

    render() {
        const { formPage, mealPlan, message, a, b, c, d, e, f, g, error404, error} = this.state
        if(error404) return <h1>{error404}</h1>
        return (
            <div className="background" id="meal-plan-image">
                <div className="meal-plan">
                    <div className="main-container">
                        <div className="content-container">
                            <div className="mealPlanDays">
                                <button className={a}>Day 1</button> 
                                <button className={b}>Day 2</button> 
                                <button className={c}>Day 3</button> 
                                <button className={d}>Day 4</button> 
                                <button className={e}>Day 5</button> 
                                <button className={f}>Day 6</button> 
                                <button className={g}>Day 7</button> 
                            </div> 
                            <div className="display">
                                <div className="display-meal">
                                    <h1>Day {formPage}</h1>
                                    {formPage === 1 && <DisplayMeal 
                                            day={mealPlan.day1} 
                                            deleteMeal={this.deleteMeal} 
                                            deleteFood={this.deleteFood} 
                                            dayIndex={formPage} />}
                                    {formPage === 2 && <DisplayMeal 
                                            day={mealPlan.day2} 
                                            deleteMeal={this.deleteMeal} 
                                            deleteFood={this.deleteFood} 
                                            dayIndex={formPage} />}
                                    {formPage === 3 && <DisplayMeal 
                                            day={mealPlan.day3} 
                                            deleteMeal={this.deleteMeal} 
                                            deleteFood={this.deleteFood} 
                                            dayIndex={formPage} />}
                                    {formPage === 4 && <DisplayMeal 
                                            day={mealPlan.day4} 
                                            deleteMeal={this.deleteMeal} 
                                            deleteFood={this.deleteFood} 
                                            dayIndex={formPage} />}
                                    {formPage === 5 && <DisplayMeal 
                                            day={mealPlan.day5} 
                                            deleteMeal={this.deleteMeal} 
                                            deleteFood={this.deleteFood} 
                                            dayIndex={formPage} />}
                                    {formPage === 6 && <DisplayMeal 
                                            day={mealPlan.day6} 
                                            deleteMeal={this.deleteMeal} 
                                            deleteFood={this.deleteFood} 
                                            dayIndex={formPage} />}
                                    {formPage === 7 && <DisplayMeal 
                                            day={mealPlan.day7} 
                                            deleteMeal={this.deleteMeal} 
                                            deleteFood={this.deleteFood} 
                                            dayIndex={formPage} />}
                                </div>
                                <div className="add-meal">
                                    <Meal addMealtoDay={this.addMealtoDay} mealSavedFalse={this.mealSavedFalse} mealSavedTrue={this.mealSavedTrue}/> 
                                </div>
                                    <div className="buttons">
                                        { formPage > 1 && <button onClick={this.backForm}>back</button>}
                                        { formPage === 1 && <button onClick={this.redirectUser}>back</button>}
                                        { formPage !== 7 && <button onClick={this.nextForm}>next</button>}
                                        { formPage === 7 && <button onClick={this.submitForm}>Submit</button>}
                                        { error && <p>{error}</p>}
                                        { message && <>{message}</>}
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

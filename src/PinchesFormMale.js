import React, { Component } from 'react';
import axios from 'axios';
import './css/pinchesform.scss'

export default class PinchesFormMale extends Component {
    state = {};

    //handleInputChange keeps track of the imput fields by setting state of username and password
    handleInputChange = (e) => {
        if (e.currentTarget.value) {
            e.currentTarget.style.background="rgba(0, 0, 0, 0.5)";
        }
        const {value, id} = e.currentTarget;
        this.setState({[id]: value})
    }

    //this function runs when the calculate button is clicked. it sends the request to the backend to calculate body fat. we recieve the bodyFat value back and set state of bodyfat on this component. we then invoke the setBodyFat function which is passed through props from ClientAttributeForm
    calcBodyFat = (e) => {
        e.preventDefault();
        const { chest, abdomen, thigh } = this.state
        const { dob, weight } = this.props
        const config = { headers: {token: localStorage.getItem('token')}}
        const url = `${process.env.REACT_APP_API_URL}/admin/pinches/male`;
        const data = { chest, abdomen, thigh, dob, weight }
        axios.post(url, data, config)
            .then(resp => {
                const {percBodyFat, fatMass, leanMass} = resp.data
                this.setState({bodyFat: percBodyFat, fatMass, leanMass}, () => {
                    const { bodyFat, fatMass, leanMass } = this.state
                    this.props.setBodyFat(bodyFat, fatMass, leanMass )
                    if(this.props.toggleBodyFatCalc) this.props.toggleBodyFatCalc('calculation complete')
                })
            })
            .catch(err => {
                if(!err.response) return console.error(err)
                if(err.response.status === 500) return this.props.history.replace('/servererror')
                if(err.response.status === 401 || err.response.status === 403) return this.props.history.replace('/admin')
            })
    }

    render() {
    return (
        <div className="pinches">
            <div className="field">
                <label htmlFor="chest">Chest(mm):</label>
                <input type="text-field" id="chest" onChange={this.handleInputChange}/>
            </div>
            <div className="field">
                <label htmlFor="abdomen">Abdomen(mm):</label>
                <input type="text-field" id="abdomen" onChange={this.handleInputChange}/>
            </div>
            <div className="field">
                <label htmlFor="thigh">Thigh(mm):</label>
                <input type="text-field" id="thigh" onChange={this.handleInputChange}/>
            </div>
            <button onClick={this.calcBodyFat}>Calculate</button>
        </div>
    )
    }
}

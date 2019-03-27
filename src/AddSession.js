import React, { Component } from 'react'

class AddSession extends Component {
    state = {};

    submitForm = (e) => {
        e.preventDefault()
        const {date, time, location} = this.state
        this.props.addSession(date, time, location)
    }

    handleInputChange = (e) => {
        const {id, value} = e.target
        this.setState({[id]: value})
    }

    render() {
        return (
            <>
                <form>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" onChange={this.handleInputChange} />
                    <label htmlFor="time">Time:</label>
                    <input type="time" id="time" onChange={this.handleInputChange}/>
                    <label htmlFor="location">Location:</label>
                    <input type="text" id="location" onChange={this.handleInputChange}/>
                    <button onClick={this.submitForm}>Submit</button>
                </form>
            </>
        )
    }
}

export default AddSession;
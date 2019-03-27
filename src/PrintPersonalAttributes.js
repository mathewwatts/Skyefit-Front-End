// import React from 'react'

// export default function PrintPersonalAttributes(props) {
//   const {obj} = props
//   return (
//     <div>
//       <div className="box">
//         <p>Height:</p><p>{obj.height} cm</p>
//       </div>
//       <div className="box">
//         <p>Weight:</p><p>{obj.weightLog[obj.weightLog.length - 1]} kg</p>
//         <div>
//           <input type="text" placeholder="New weight" id="weight" onChange={props.handleInputChange}></input>
//           <button>Update</button>
//         </div>
//       </div>
//       { obj.bodyFatLog[obj.bodyFatLog.length - 1] && <div className="box">
//         <p>Body Fat:</p><p>{obj.bodyFatLog[obj.bodyFatLog.length - 1].toFixed(2)} %</p>
//       </div>}
//       {obj.fatMass[obj.fatMass.length - 1] && <div className="box">
//         <p>Fat Mass:</p><p>{obj.fatMass[obj.fatMass.length - 1].toFixed(2)} %</p>
//       </div>}
//       {obj.leanMass[obj.leanMass.length - 1] && <div className="box">
//         <p>Lean Mass:</p><p>{obj.leanMass[obj.leanMass.length - 1].toFixed(2)} %</p>
//       </div>}
//         <button>Calculate Body Fat</button>
//       <div className="box">
//         <p>Goal Weight:</p><p>{obj.goalWeight} kg</p>
//         <div>
//           <input type="text" placeholder="New goal weight" id="goalWeight"></input>
//           <button>Update</button>
//         </div>
//       </div>
//       <div className="box">
//         <p>Goal Body Fat:</p><p>{obj.goalBodyFat} %</p>
//         <div>
//           <input type="text" placeholder="New goal body fat" id="goalBodyFat"></input>
//           <button>Update</button>
//         </div>
//       </div>
//     </div>
//   )
// }

import React, { Component } from 'react'
import PinchesFormFemale from './PinchesFormFemale'
import PinchesFormMale from './PinchesFormMale'

export default class PrintPersonalAttributes extends Component {
  state={}

  handleInputChange = (e) => {
    const {value, id} = e.currentTarget
    this.setState({[id]: value})
    if (e.currentTarget.value) {
      e.currentTarget.style.background="rgba(0, 0, 0, 0.5)";
    }
  }

  updateAttr = (e) => {
    e.preventDefault()
    const { id, value} = e.currentTarget.previousSibling
    this.props.updateAttr(id, value)
    e.currentTarget.previousSibling.value = ''
  }

  toggleBodyFatCalc = (message) => {
    if(message === 'calculation complete') this.setState({calcMessage: 'Body Fat has been updated'})
    const {bodyFatCalc} = this.state
    if(!bodyFatCalc) return this.setState({bodyFatCalc: true})
    this.setState({bodyFatCalc: false})
  }
  
  render() {
    const {obj, user} = this.props
    const {bodyFatCalc, calcMessage} = this.state
    return (
      <div>
      <div className="box">
        <p>Height:</p><p>{obj.height} cm</p>
      </div>
      <div className="box">
        <p>Weight:</p><p>{obj.weightLog[obj.weightLog.length - 1]} kg</p>
        { !user && <div>
          <input type="text" placeholder="New weight" id="weightLog" onChange={this.handleInputChange}></input>
          <button onClick={this.updateAttr}>Update</button>
        </div>}
      </div>
      { obj.bodyFatLog[obj.bodyFatLog.length - 1] && <div className="box">
        <p>Body Fat:</p><p>{obj.bodyFatLog[obj.bodyFatLog.length - 1].toFixed(2)} %</p>
      </div>}
      {obj.fatMass[obj.fatMass.length - 1] && <div className="box">
        <p>Fat Mass:</p><p>{obj.fatMass[obj.fatMass.length - 1].toFixed(2)} kg</p>
      </div>}
      {obj.leanMass[obj.leanMass.length - 1] && <div className="box">
        <p>Lean Mass:</p><p>{obj.leanMass[obj.leanMass.length - 1].toFixed(2)} kg</p>
      </div>}
        {!user && <button onClick={this.toggleBodyFatCalc}>Calculate Body Fat</button>}
        {bodyFatCalc && obj.gender === 'female' && <PinchesFormFemale 
              dob={obj.dob} 
              weight={obj.weightLog[obj.weightLog.length - 1]}
              setBodyFat={this.props.setBodyFat}
              toggleBodyFatCalc={this.toggleBodyFatCalc}/>}
        {bodyFatCalc && obj.gender === 'male' && <PinchesFormMale 
              dob={obj.dob} 
              weight={obj.weightLog[obj.weightLog.length - 1]}
              setBodyFat={this.props.setBodyFat}
              toggleBodyFatCalc={this.toggleBodyFatCalc}/>}
        {calcMessage && <p>{calcMessage}</p>}
      <div className="box">
        <p>Goal Weight:</p><p>{obj.goalWeight} kg</p>
        {!user && <div>
          <input type="text" placeholder="New goal weight" id="goalWeight" onChange={this.handleInputChange}></input>
          <button onClick={this.updateAttr}>Update</button>
        </div>}
      </div>
      <div className="box">
        <p>Goal Body Fat:</p><p>{obj.goalBodyFat} %</p>
        {!user && <div>
          <input type="text" placeholder="New goal body fat" id="goalBodyFat" onChange={this.handleInputChange}></input>
          <button onClick={this.updateAttr}>Update</button>
        </div>}
      </div>
    </div>
    )
  }
}


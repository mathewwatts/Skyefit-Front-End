import React from 'react'

const PersonalDetailForm = (props) => {
  return (
    <form>
      <label htmlFor="firstName">First Name:</label>
      {props.firstNameError && <p>{props.firstNameError}</p>}
      <input type="text" id="firstName" onChange={props.handleInputChange} value={props.firstName}/>
      <label htmlFor="lastName">Surname:</label>
      <input type="text" id="lastName" onChange={props.handleInputChange} value={props.lastName}/>
      <label htmlFor="dob">Date of birth:</label>
      {props.dobError && <p>{props.dobError}</p>}
      <input type="date" id="dob" onChange={props.handleInputChange} value={props.dob}/>
      <label htmlFor="gender">Gender:</label>
      {props.genderError && <p>{props.genderError}</p>}
      <div>
        <div className="radio-input">
          <label htmlFor="gender">Male</label><br></br>
          <input className="radio" type="radio" id="gender" name="gender" value="male" onClick={props.handleInputChange} checked={props.gender === 'male'} onChange={() => null} />
        </div>
        <div className="radio-input">
          <label htmlFor="gender">Female</label>
          <input className="radio" type="radio" id="gender" name="gender" value="female" onClick={props.handleInputChange} checked={props.gender === 'female'} onChange={() => null} />
        </div>                
      </div>
    </form>
  )
}

export default PersonalDetailForm;
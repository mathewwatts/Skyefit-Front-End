import React from 'react'
import ImageUpload from './ImageUpload'
import './css/accountdetailsform.scss';

const AccountDetailForm = (props) => {
  return (
    <div className="account-container">
      <form>
            <label>Profile picture:</label>
            { props.image && <img src={props.image} alt="user profile"/>}
            <ImageUpload image={props.image} addImage={props.addImage}/>
            <label htmlFor="username">Username:</label>
            { props.userNameError && <p>{props.userNameError}</p>}
            <input type="text" id="username" onChange={props.handleInputChange} value={props.username}/>
            <label htmlFor="email">Email:</label>
            { props.emailError && <p>{props.emailError}</p>}
            <input type="email" id="email" onChange={props.handleInputChange} value={props.email}/>
            <label htmlFor="contactNumber">Contact Number:</label>
            { props.contactError && <p>{props.contactError}</p>}
            <input type="text" id="contactNumber" onChange={props.handleInputChange} value={props.contactNumber}/>
            { !props.edit && <><label htmlFor="password">Password:</label>
            <input type="password" id="password" onChange={props.handleInputChange} value={props.password}/></>}
        </form>
    </div>
  )
}

export default AccountDetailForm;
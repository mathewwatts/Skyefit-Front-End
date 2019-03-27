import React from 'react'
import { Link } from 'react-router-dom';
import profilePic from "./assets/img/default-profile-pic.jpg"
// import './css/userprofile.scss'


//UserCard will return and image and the users first name and last name which links to the user profile page when clicked on
const UserCard = (props) => {
  const url = `/admin/users/${props.id}`
  return (
    <div className="user-card" key={props.id}>
      {props.image && <img src={props.image} alt={props.firstName}/>}
      {!props.image && <img src={profilePic} alt={props.firstName}/>}
      <Link className="text" to={url}>{props.firstName} {props.lastName}</Link>
    </div>
  )
}

export default UserCard;
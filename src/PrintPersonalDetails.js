import React from 'react'

export default function PrintPersonalDetails(props) {
    const {obj} = props
         
    return (
      <>
      {/* <div className="persDetails"> */}
        <div className="box">
          <p>Client Name:</p> <p> {obj.firstName} {obj.lastName}</p>
        </div>
        <div className="box">
          <p>Date of Birth:</p> <p>{obj.dob.split('T')[0].split('-').reverse().join('/')}</p>
        </div>
        <div className="box">
          <p>Gender:</p> <p>{obj.gender}</p>
        </div>
       {/* </div> */}
       </>
    )
}



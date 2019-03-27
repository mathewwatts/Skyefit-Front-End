import React from 'react'

export default function PrintContactDetails(props) {
  const { obj } = props
  return (
    <div>
      <div className="box">
        <p>Email:</p><p>{obj.email}</p>
      </div>
      <div className="box">
        <p>Contact Number:</p><p>{obj.contactNumber}</p>
      </div>
    </div>
  )
}

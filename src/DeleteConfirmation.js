import React from 'react'

export default function DeleteConfirmation(props) {
  return (
    <div>
      <p>The user has been deleted</p>
      <button onClick={() => props.history.replace('/admin/users')}>ok</button>
    </div>
  )
}

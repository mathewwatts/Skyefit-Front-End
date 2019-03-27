import React from 'react'
import UserCard from './UserCard'

const PrintUserCards = (props) => {
  const {users} = props
  return (
    <div>
        {
            users.map(user => {
                return (
                    <UserCard
                    key={user._id}
                    id={user._id}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    />
                )
            })
        }
    </div>
  )
}

export default PrintUserCards;
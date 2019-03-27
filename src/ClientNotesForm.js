import React from 'react'

const ClientNotesForm = (props) => {
  return (
    <form>
          <label htmlFor="notes">Client Notes:</label>
          <textarea id="notes" onChange={props.handleInputChange} value={props.notes}/>
          <label htmlFor="dietaryRequirements">Dietary Requirements:</label>
          <textarea id="dietaryRequirements" onChange={props.handleInputChange} value={props.dietaryRequirements}/>
    </form>
  )
}

export default ClientNotesForm;
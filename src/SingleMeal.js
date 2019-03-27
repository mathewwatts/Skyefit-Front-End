import React from 'react'

export default function OneMeal(props) {
  const {meal} = props
  return (
    <div>
      {
        meal.map(foodObj => {
          return (
            <>
              <p key={Math.random()}>{foodObj.food_name}</p>
              <p>Serving weight: {foodObj.serving_weight_grams}g, Cal: {foodObj.nf_calories}, Prot: {foodObj.nf_protein}g, Carb: {foodObj.nf_total_carbohydrate}g, Fat: {foodObj.nf_total_fat}</p>
            </>
          )
        })
      }
    </div>
  )
}
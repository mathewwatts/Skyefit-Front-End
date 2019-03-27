import React from 'react'

export default function OneMeal(props) {
  const {meal, day, mealIndex} = props
  return (
    <>
      {meal.map((foodItem, i) => {
          return(
            <div>
              {/* <p key={i}>{foodItem.food_name}<button onClick={() => props.deleteFood(day, mealIndex, i)}>-</button></p> */}
              {/* <img src={foodItem.photo.thumb} alt=""/> */}
              <p><strong>{foodItem.serving_qty} {foodItem.serving_unit} {foodItem.food_name}</strong><button onClick={() => props.deleteFood(day, mealIndex, i)}>-</button></p>
              <p>Serving weight: {foodItem.serving_weight_grams}g, Cal: {foodItem.nf_calories}, Prot: {foodItem.nf_protein}g, Carb: {foodItem.nf_total_carbohydrate}g, Fat: {foodItem.nf_total_fat}</p>
              {/* <p>Cal: {foodItem.nf_calories}</p> */}
              {/* <p>Prot: {foodItem.nf_protein}g</p> */}
              {/* <p>Carb: {foodItem.nf_total_carbohydrate}g</p> */}
              {/* <p>Fat: {foodItem.nf_total_fat}</p> */}
            </div>
          )
      })}
    </>
  )
}
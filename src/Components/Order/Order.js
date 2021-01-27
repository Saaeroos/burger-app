import React from "react";
import classes from "./Order.module.css";

const Order = (props) => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }
  const ingredientsOutput = ingredients.map((ing) => (
    <span style={{
      textTransform: 'capitalize',
      display: 'inline-block',
      margin: '0 8px',
      border: '1px solid #ccc',
      padding: '5px'
    }} key={ing.name}>
      {ing.name}: ({ing.amount})
    </span>
  ));
  return (
    <div className={classes.Order}>
      {ingredientsOutput}
      <p>
        price: <strong>Euro {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;

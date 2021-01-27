import * as actionTypes from "./actionTypes";
import axios from "../../Axios-orders";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredient = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("https://burger-project-e95e3.firebaseio.com/ingredients.json")
      .then((res) => {
        dispatch(setIngredient(res.data))
      })
      .catch((err) => {
        dispatch(fetchIngredientsFailed())
      });
  };
};

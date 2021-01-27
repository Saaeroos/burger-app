import * as actionTypes from '../actions/actionTypes'

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 1,
  meat: 1.5,
  bacon: 0.6,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
}

const burgerBuilderReducer =(state = initialState, action) =>{
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice +INGREDIENTS_PRICES[action.ingredientName]
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
      }
    case actionTypes.SET_INGREDIENT:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false
        
      }
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      }
    default:
      return state;
  }
}

export default burgerBuilderReducer;
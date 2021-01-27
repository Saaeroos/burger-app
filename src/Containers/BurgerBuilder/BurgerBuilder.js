import React, { Component } from "react";

import { connect } from 'react-redux'

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import axios from "../../Axios-orders";
import Spinner from "../../Components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
// import * as actionTypes from '../../Store/actions/actionTypes'

import * as BurgerBuilderActions from '../../Store/actions/index'




class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ingredients: null,
      // totalPrice: 4,
      // purchasable: false,
      ordered: false,
      loading: false,
      error: false
    };
  }
  componentDidMount() {
    this.props.ingredientsInit()
    // axios
    //   .get("https://burger-project-e95e3.firebaseio.com/ingredients.json")
    //   .then((res) => {
    //     this.setState({
    //       ingredients: res.data,
    //     });
    //   })
    //   .catch((err) => {
    //     this.setState({
    //       error: true
    //     })
    //   });
  }

  updatePurchasable = (ingredients) => {
    let sum = Object.keys(ingredients)
      .map((igkey) => {
        return ingredients[igkey];
      })
      .reduce((sum, elm) => {
        return sum + elm;
      }, 0);
    return sum > 0;
  };

  // addIngredientsHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = { ...this.state.ingredients };
  //   updatedIngredients[type] = updatedCount;
  //   const updatedPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: updatedPrice,
  //   });
  //   this.updatePurchasable(updatedIngredients);
  // };
  // deleteIngredientsHandler = (type) => {
  //   const oldCount = this.props.ings[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = { ...this.props.ing };
  //   updatedIngredients[type] = updatedCount;
  //   const updatedPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: updatedPrice,
  //   });
  //   this.updatePurchasable(updatedIngredients);
  // };
  orderHandler = () => {
    this.setState({
      ordered: true,
    });
  };
  closeBackdropHandler = () => {
    this.setState({
      ordered: false,
    });
  };
  continuePurchase = () => {
    this.props.history.push('./checkout')
    // this.setState({
    //   loading: true,
    // });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Mo",
    //     address: {
    //       street: "mocastraat 14c",
    //       zipCode: "2123 HV",
    //       country: "Netherlands",
    //     },
    //     email: "mo@domain.com",
    //     deliveryMethod: "fastest method",
    //   },
    // };
    // axios
    //   .post("/orders", order)
    //   .then((res) => {
    //     this.setState({
    //       loading: false, ordered: false
    //     });
    //   })
    //   .catch((err) => {
    //     this.setState({
    //       loading: false, ordered: false
    //     });
    //   });
  };
  render() {
    const disabledInfo = { ...this.props.ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error ? <p>ingredients can't be loaded</p> : <Spinner />;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientDeleted={this.props.onIngredientRemoved}
            disabledIngredients={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchasable(this.props.ings)}
            ordered={this.orderHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          cancel={this.closeBackdropHandler}
          continue={this.continuePurchase}
          price={this.props.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal show={this.state.ordered} close={this.closeBackdropHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice,
    error: state.error
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(BurgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(BurgerBuilderActions.removeIngredient(ingName)),
    ingredientsInit: () => dispatch(BurgerBuilderActions.initIngredients())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));

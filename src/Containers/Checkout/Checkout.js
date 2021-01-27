import React, { Component } from "react";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

import { connect } from 'react-redux'

class Checkout extends Component {
  // state = {
  //   ingredients: null,
  //   totalPrice: 0
  // };

  
  checkoutContinueHandler = () => {
    this.props.history.push('/checkout/contact-data')
  }
  checkoutCancelHandler = () => {
    this.props.history.goBack()
  }
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.props.ings} continued={this.checkoutContinueHandler} cancelOrder={this.checkoutCancelHandler}/>
        <Route path={this.props.match.path + '/contact-Data'} component={ContactData}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  }
}

export default connect(mapStateToProps)(Checkout);

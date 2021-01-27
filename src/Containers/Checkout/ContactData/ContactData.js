import React, { Component } from 'react'
import Button from '../../../Components/UI/Button/Button'
import classes from './ContactData.module.css';
import axios from "../../../Axios-orders";
import Spinner from '../../../Components/UI/Spinner/Spinner';
import {withRouter} from 'react-router-dom'

import { connect } from 'react-redux'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postCode: ''
    },
    loading: false
  }
  orderHandler = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const order = {
      ingredients: this.props.ings,
      price: this.props.totalPrice,
      customer: {
        name: "Mo",
        address: {
          street: "mocastraat 14c",
          zipCode: "2123 HV",
          country: "Netherlands",
        },
        email: "mo@domain.com",
        deliveryMethod: "fastest method",
      },
    };
    axios
      .post("/orders.json", order)
      .then((res) => {
        this.setState({
          loading: false
        });
        this.props.history.push('/')
      })
      .catch((err) => {
        this.setState({
          loading: false
        });
      });
  }
  render(){
    let form = (
      <form>
          <input className={classes.Input} type="text" name="name" placeholder="Your name" />
          <input className={classes.Input} type="email" name="email" placeholder="Your email" />
          <input className={classes.Input} type="text" name="street" placeholder="Your street" />
          <input className={classes.Input} type="text" name="postCode" placeholder="Your postcode" />
          <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>
    )
    if(this.state.loading){
      form = <Spinner />
    }
    return(
      <div className={classes.ContactData}>
        <h1>Enter your Contact Data</h1>
          {form}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice
  }
}

export default connect(mapStateToProps)(withRouter(ContactData));
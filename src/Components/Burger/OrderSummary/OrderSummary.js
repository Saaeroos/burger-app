import React from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

const OrderSummary = (props)=> {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igkey => {
            return <li key={igkey}><span style={{ textTransform: 'capitalize'}}>{igkey} </span>{props.ingredients[igkey]}</li>
        })
        return(
            <Aux>
                <p>You order is a delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>price: </strong>{props.price.toFixed(2)}€</p>
                <p>Continue to checkout?</p>
                <Button btnType='Danger' clicked={props.cancel}>Cancel</Button>
                <Button btnType='Success' clicked={props.continue}>Continue</Button>
            </Aux>
        )
}

export default OrderSummary
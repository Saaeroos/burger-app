import React from 'react'
import classes from './Burger.module.css'
import {withRouter} from 'react-router-dom'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'


const Burger = (props) => {
    let transformedIngredient = Object.keys(props.ingredients)
        .map(igKey=>{
            return [...Array(props.ingredients[igKey])].map((_, i)=>{
                return(
                    <BurgerIngredient key={igKey + i} type={igKey} />
                )
            })
        }).reduce((arr, elm)=>{
            return arr.concat(elm)
        }, [])
        if(transformedIngredient.length === 0 ) {
            transformedIngredient = <p>Please start adding ingredients</p>
        }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}
export default withRouter(Burger);
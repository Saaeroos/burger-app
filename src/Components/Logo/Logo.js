import React from 'react'

import burgerLogo from '../../assets/images/myburger.png'
import classes from './Logo.module.css'

const Logo = (props)=> (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="My burger" />
    </div>
)

export default Logo;
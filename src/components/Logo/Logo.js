import React from 'react';
import burguerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css'

//style={{ height: props.height }} > OVERWRITE as propriedades do CSS!!!

const logo = (props) => (
    <div className={classes.Logo} style={{ height: props.height }}>
        <img src={burguerLogo} alt="MyBurguer"></img>
    </div>
);

export default logo;
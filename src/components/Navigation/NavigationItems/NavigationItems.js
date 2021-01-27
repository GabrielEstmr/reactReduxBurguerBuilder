import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

//{props.children} > pega o que está no meio do componente pai
//IMPORTENTE: para booleanos: nao precisa "active={true}", basta active  >>> e active já pega a propriedade
const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' exact>Burguer Builder</NavigationItem>
        <NavigationItem link='/orders' >Orders</NavigationItem>
        <NavigationItem link='/auth' >Authenticate</NavigationItem>
    </ul>
);

export default navigationItems;
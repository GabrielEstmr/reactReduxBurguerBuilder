import React from 'react';
import classes from './SideDrawer.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxiliar/Auxiliar'
//Tudo reaproveitavel e segmentado pois queremos diferentes componentes dependendo se é mobile ou webpc
const sideDrawer = (props) => {

    //Importente!!!! Cria Array e depois da Join pra ter mais de uma classe
    //Ai fica "SideDrawer Open" e "SideDrawer Closed"
    let AttachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        AttachedClasses = [classes.SideDrawer, classes.Open];
    }


    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}></Backdrop>
            <div className={AttachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer;
import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'


//IMPORTANTE: para ser responsivo: pode dicionar propriedades 
//no CSS dos componentes mas isso impoede de usar-los em outros lugares
//AI USAMOS NO JS que vai importar o componente!!

//Tudo reaproveitavel e segmentado pois queremos diferentes componentes dependendo se é mobile ou webpc
const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}></DrawerToggle>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;
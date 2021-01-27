import React, { Component } from 'react';
import Aux from '../Auxiliar/Auxiliar';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

//Toolbar: está aqui pois queremos que ela apareca em todas as paginas
// APP > LAYOUT > TOOLBAR

class Layout extends Component {

    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        // //NAO PODE ASSIM
        // this.state({ showSideDrawer: !this.state.showSideDrawer })
        // IMPORTANTE: setState((prevState)  >>> imput necessariamente será um estado, por iso nao especifica!!!
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        }

        )
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}


export default Layout;
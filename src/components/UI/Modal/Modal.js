import React, { Component } from 'react';
import classes from './Modal.css'
import Aux from '../../../hoc/Auxiliar/Auxiliar'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        //IMPORTANTE: Modal nao aparece pois em Should: tem apenas a variação do State > precisa tbm a variação de children
        if (nextProps.show !== this.props.show || nextProps.children !== this.props.children) {
            return true
        } else {
            return false
        }
        // EQUIVALENTE /\ return  nextProps.show !== this.props.show
    }

    componentDidUpdate() {
        console.log('[Modal] DidUpdate');
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}></Backdrop>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}




export default Modal;
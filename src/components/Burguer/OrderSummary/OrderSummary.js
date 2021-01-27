import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliar/Auxiliar';
import Button from '../../UI/Button/Button'

//style={{}} primeiro colchetes: entreda dinamica > segundo: objeto do javascript
//Mudou de funcão para class > utilizar Lifecycle

class OrderSummary extends Component {

    componentDidUpdate() {
        console.log('[OrderSummary] Did Update')
    }


    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            )
        })
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicius burguer with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }
}




export default OrderSummary
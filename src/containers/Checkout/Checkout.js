import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     totalPrice: 0
    // };

    // constructor(props) {//igual component will mount
    //     super(props);
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         //Here: in this form: ['salad', '1']
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }

    //     }
    //     console.log('ingredients', ingredients);
    //     // this.state({ ingredients: ingredients, totalPrice: price });
    //     this.state = { ingredients: ingredients, totalPrice: price };

    // };


    // componentDidMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         //Here: in this form: ['salad', '1']
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }

    //     }
    //     console.log('ingredients', ingredients);

    //     this.setState({ ingredients: ingredients, totalPrice: price });
    // }

    componentDidMount() {
        this.props.onInitPurchase();
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {

        // IMPORTANTE: REDIDECT manda pra outra página, ai fez um if aqui
        let summary = <Redirect to="/"></Redirect>
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"></Redirect> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        // component={ContactData} 
                        // MTO IMPORTANTE!!!!
                        // render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} 
                        component={ContactData}
                    />
                </div>

            );
        }
        return summary;
    };
};

const mapStateToProps = state => {
    return {
        ings: state.burguerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
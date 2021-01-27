import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHander from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'
// import Order from '../../components/Order/Order';

class Orders extends Component {

    // state = {
    //     orders: [],
    //     loading: true
    // };

    componentDidMount() {

        // // // Aqui: para testar o error
        // // // axios.get('orders.jjj')
        // // axios.get('/orders.json')
        // //     .then(res => {
        // //         const fetchedOrders = [];
        // //         for (let key in res.data) {
        // //             fetchedOrders.push({
        // //                 ...res.data[key],
        // //                 id: key
        // //             });
        // //         };
        // //         console.log('res.data', res.data)
        // //         this.setState({ loading: false, orders: fetchedOrders })
        // //     })
        // //     .catch(err => {
        // //         this.setState({ loading: false });
        // //     });
        // // console.log('this.state', this.state)

        this.props.onFetchOrders();
    }


    render() {
        let orders = <Spinner></Spinner>;
        if (!this.props.loading) {

            orders = this.props.orders.map(e => (
                <Order
                    key={e.id}
                    ingredients={e.ingredients}
                    price={e.price}
                />
            ))

        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHander(Orders, axios));
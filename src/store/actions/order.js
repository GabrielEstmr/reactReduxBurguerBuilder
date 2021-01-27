import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurguerSucess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};


export const purchaseBurguerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_FAIL,
        error: error
    }
};

export const purchaseBurguerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGUER_START
    };
};

export const purchaseBurguer = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurguerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                // this.setState({ loading: false });
                // this.props.history.push('/');

                dispatch(purchaseBurguerSucess(response.data, orderData))
            })
            .catch(error => {
                // this.setState({ loading: false });
                dispatch(purchaseBurguerFail(error))
            });
    };
};



export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}


export const fetchOrdersSucess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
};

export const fetchOrders = () => {

    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                };
                dispatch(fetchOrdersSucess(fetchedOrders))
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            });
        console.log('this.state', this.state)
    }


};

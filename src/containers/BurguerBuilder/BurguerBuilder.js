import React, { Component } from 'react';

import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import Burguer from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

// import * as actionTypes from '../../store/actions'

import * as actions from '../../store/actions/index'


// //Contantes Globais: UpperCase
// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.6,
// };

class BurguerBuilder extends Component {
    //Base Price = 4 dolars
    state = {
        // ingredients: null,
        // totalPrice: 4,
        // purchasable: false,
        purchasing: false,
        // loading: false
    };

    componentDidMount() {
        // //AQUI: vai dar console las propriedades de Routing > pois esse componente faz parte da Routable Area
        // // History e Location e MAtch
        // console.log('BulguerBuilder this.props', this.props)
        // axios.get('https://react-my-burguer-gabriel.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data })
        //         // console.log(response.data)
        //     }).catch(error => { });

        console.log(this.props)
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        // //.reduce(sum(),0) > 0 indica que começa com 0 ingredientes
        // const ingredients = {
        //     ...this.state.ingredients
        // };
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        //Aqui: se sum>0 purchasable = true se nao purchasable=false
        //usa sum>0 pra criar true ou false
        return sum > 0;
    }

    // //muda em funcão do tipo
    // //...this: cria outra array!!!
    // addIngrdientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     console.log(this.state);
    //     ////No começo foi assim mas ai ele estava analisando o estado antigo e não o novo adicionado
    //     //this.updatePurchaseState();
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngrdientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     //Aqui sai da funcao sem faxer nada se this.state.ingredients[type]<=0
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceAddition;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     console.log(this.state);
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // //não pode > pois não pega o estado corretamente > TEM QUE SER ARROW FUNCTION!!!
    // purchaseHandler() {
    //     this.setState({ purchasing: true });
    // }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // // IRA PARA A OUTRA PÁGINA
        // //alert('You continue');
        // this.setState({ loading: true })
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Gabriel Rodrigues',
        //         address: {
        //             street: 'Dos Canarinhos',
        //             zipCode: '38412162',
        //             country: 'Brazil'
        //         },
        //         email: 'gabriel.estmr2gmail.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({ loading: false, purchasing: false })
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false, purchasing: false })
        //     });

        // // // // //IMPORTANTISSIMO!!!!!  > comentei pos REDUX
        // // // // const queryParams = [];
        // // // // for (let e in this.state.ingredients) {
        // // // //     queryParams.push(encodeURIComponent(e) + '=' + encodeURIComponent(this.state.ingredients[e]));
        // // // // }

        // // // // //Passando o Preço
        // // // // queryParams.push('price=' + this.state.totalPrice);

        // // // // const queryString = queryParams.join('&');

        // // // // console.log('queryParams', queryParams);
        // // // // console.log('queryString', queryString);

        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }



    //Aqui: leva o State para BuildControls
    render() {
        const disabledInfo = {
            // ...this.state.ingredients
            ...this.props.ings//pos redux
        };
        //console.log('AQUI ANTES', disabledInfo);
        for (let key in disabledInfo) {
            //disabledInfo[key] = disabledInfo[key] <= 0
            if (disabledInfo[key] <= 0) {
                disabledInfo[key] = true;
            } else {
                disabledInfo[key] = false;
            }
        };
        //console.log('AQUI DEPOIS', disabledInfo);

        let orderSummary = null;
        // let burguer = <Spinner></Spinner>;
        let burguer = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner></Spinner>;
        //Se this.state.ingredients = null  >>>SE STATE É SETADO!!
        // if (this.state.ingredients) {
        if (this.props.ings) {
            burguer = (
                <Aux>
                    <Burguer ingredients={this.props.ings} />
                    <BuildControls
                        // ingredientAdded={this.addIngrdientHandler}
                        // ingredientRemoved={this.removeIngrdientHandler}
                        //AQUI: roda pe em BuildControls tem argumnto de entrada
                        ingredientAdded={this.props.onIngredientsAdded}
                        ingredientRemoved={this.props.onIngredientsRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}></OrderSummary>;
        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner></Spinner>;
        // }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burguer}
            </Aux>
        );
    }
}

//Relação entre REDUX e SATATE > State fica só no redux e passamos a usar apenas PROPS nos componentes
const mapStateToProps = state => {
    return {
        ings: state.burguerBuilder.ingredients,
        price: state.burguerBuilder.totalPrice,
        error: state.burguerBuilder.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        // onIngredientsAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        // onIngredientsRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName }),

        onIngredientsAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientsRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios));














//ANOTAÇÔES:
// Detectar o que é uma ação na Aplicação porém não muda o DOM > usar shouldcomponentUpdate
// Se algum componente tem outro dentro dele (ex> modal dentro de buguerbuilder) tem que controlar burguerbuilder (ir na raiz)

// SERVER <> BOM >>>troca JSON data


// ARROW FNCTION (e)=>() >>returnar JSX
//               (e)=>{} >>retornar nao so JSX mas geral

// // ou:
// // const order = (props) => (
// //     <div className={classes.Order}>
// //         <p>Ingredients: Salad (1)</p>
// //         <p>Price:<strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
// //     </div>
// // )

// // ou

// // const order = (props) => {
// //     return (
// //         <div className={classes.Order}>
// //             <p>Ingredients: Salad (1)</p>
// //             <p>Price:<strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
// //         </div>
// //     )

// // }

























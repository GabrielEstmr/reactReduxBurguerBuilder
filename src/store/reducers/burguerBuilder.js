import * as actionTypes from '../actions/actionTypes'


const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};


//Contantes Globais: UpperCase
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6,
};

//IMPORTANTE PRA CARALHO!!!!
// Spread Operator (...OBJECT) apenas cria novo apontamento para o primeiro nível do OBJ
// > se for mais de um nível > tem que usar (...SUBOBJETO)

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            //AQUI: Exemplo de uso do (...) em subObjetos
            return {
                ...state,
                ingredients: {
                    //Retirando ligação Pointer Memória > distributindo propriedades
                    ...state.ingredients,
                    //Setando o novo valor do Ingredient Adicionado
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            //AQUI: Exemplo de uso do (...) em subObjetos
            return {
                ...state,
                ingredients: {
                    //Retirando ligação Pointer Memória > distributindo propriedades
                    ...state.ingredients,
                    //Setando o novo valor do Ingredient Adicionado
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                // ingredients: action.ingredients,
                ingredients: {
                    //Do jeito de cima funciona mas assim vc força a ordem certo dos ingredientes no FRONT
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 4,
                error: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;


// Para async no reducer >> npm install --save redux-thunk

import React, { Component } from 'react';

import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                //Default value
                value: 'fastest',
                //Para não dar erro na validação qusndo muda > consequencia: tem que setar tudo
                validation: {},
                //Para não dar erro na validação do botão
                valid: true
            }
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        // this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({ loading: false });
        //         this.props.history.push('/');
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false });
        //     });

        this.props.onOrderBurguer(order);
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burguerBuilder.ingredients,
        price: state.burguerBuilder.totalPrice,
        loading: state.order.loading
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onOrderBurguer: (orderData) => dispatch(actions.purchaseBurguer(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
















































// import React, { Component } from 'react';
// import Spinner from '../../../components/UI/Spinner/Spinner';
// import Button from '../../../components/UI/Button/Button';
// import classes from './ContactData.css';
// import axios from '../../../axios-orders';
// import Input from '../../../components/UI/Input/Input'

// class ContactData extends Component {
//     //Aqui: podemos usar uma função para setar o State
//     //Nao foi feito a fim de simplificar
//     state = {
//         orderForm: {
//             name: {
//                 elementType: 'input',
//                 elementConfig: {
//                     type: 'text',
//                     placeholder: 'Your Name'
//                 },
//                 value: '',
//                 validation: {
//                     required: true
//                 },
//                 valid: false,
//                 touched: false
//             },
//             street: {
//                 elementType: 'input',
//                 elementConfig: {
//                     type: 'text',
//                     placeholder: 'Street'
//                 },
//                 value: '',
//                 validation: {
//                     required: true
//                 },
//                 valid: false,
//                 touched: false
//             },
//             zipCode: {
//                 elementType: 'input',
//                 elementConfig: {
//                     type: 'text',
//                     placeholder: 'ZIP Code'
//                 },
//                 value: '',
//                 validation: {
//                     required: true,
//                     minLength: 5,
//                     maxLength: 5
//                 },
//                 valid: false,
//                 touched: false
//             },
//             country: {
//                 elementType: 'input',
//                 elementConfig: {
//                     type: 'text',
//                     placeholder: 'Country'
//                 },
//                 value: '',
//                 validation: {
//                     required: true
//                 },
//                 valid: false,
//                 touched: false
//             },
//             email: {
//                 elementType: 'input',
//                 elementConfig: {
//                     type: 'email',
//                     placeholder: 'Your E-Mail'
//                 },
//                 value: '',
//                 validation: {
//                     required: true
//                 },
//                 valid: false,
//                 touched: false
//             },
//             deliveryMethod: {
//                 elementType: 'select',
//                 elementConfig: {
//                     options: [
//                         { value: 'fastest', displayValue: 'Fastest' },
//                         { value: 'cheapest', displayValue: 'Cheapest' }
//                     ]
//                 },
//                 value: '',
//                 valid: true
//             }
//         },
//         formIsValid: false,
//         loading: false
//     }

//     orderHandler = (e) => {
//         //Prevenir que da Reload na página
//         e.preventDefault();

//         // IRA PARA A OUTRA PÁGINA > Veio de BurguerBuilder
//         //alert('You continue');
//         this.setState({ loading: true })

//         const formData = {};
//         for (let elementIdentifier in this.state.orderForm) {
//             formData[elementIdentifier] = this.state.orderForm[elementIdentifier].value;
//         }

//         const order = {
//             ingredients: this.props.ingredients,
//             price: this.props.price,
//             orderData: formData
//         }
//         axios.post('/orders.json', order)
//             .then(response => {
//                 this.setState({ loading: false });
//                 this.props.history.push('/');
//             })
//             .catch(error => {
//                 this.setState({ loading: false })
//             });

//         console.log(this.props.ingredients)
//     }

//     checkValidity(value, rules) {
//         let isValid = true;
//         if (rules.required) {
//             isValid = value.trim() !== '' && isValid;
//         }

//         //Outro Exemplo >>> mto Legal a Validação: coloca como tru e usa o valor atual
//         if (rules.minLenght) {
//             isValid = value.minLenght <= rules.minLenght && isValid
//         }

//         if (rules.maxLenght) {
//             isValid = value.maxLenght >= rules.maxLenght && isValid
//         }

//         return isValid;
//     }

//     inputChangedHandler = (event, inputIdentifier) => {
//         // console.log(event.target.value);
//         //AQUI: copia prufunda do objeto: não só da camada superior
//         //Copia para manter os valores mas mudar apenas o ".value" sem mudar o resto e sem mudar o state
//         const updatedOrderForm = {
//             ...this.state.orderForm
//         };
//         const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
//         updatedFormElement.value = event.target.value;

//         updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)

//         //Evitar form Red no começo
//         updatedFormElement.touched = true;

//         updatedOrderForm[inputIdentifier] = updatedFormElement;
//         // this.setState({ orderForm: updatedOrderForm });

//         //If all elements = valid > enabled Submit Button
//         let formIsValid = true;
//         for (let e in updatedOrderForm) {
//             formIsValid = updatedOrderForm[e].valid && formIsValid;
//         }

//         this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })

//         // console.log(updatedFormElement);
//         // console.log(this.state);
//     }

//     render() {

//         const formElementsArray = [];
//         for (let key in this.state.orderForm) {
//             formElementsArray.push({
//                 id: key,
//                 config: this.state.orderForm[key]
//             });
//         };

//         //Aqui: tudo o que retorn JSX=> () até mesmo callbackfunctions
//         //changed={(event)=>this.inputChangedHandler(event, e.id)} >>>>> self called function
//         //shouldValidade={e.config.validation} retorna true ou false se tem
//         let form = (
//             <form onSubmit={this.orderHandler}>
//                 {/* <input className={classes.Input} type="text" name="name" placeholder="Your Name"></input>
//                 <input className={classes.Input} type="email" name="email" placeholder="Your Mail"></input>
//                 <input className={classes.Input} type="text" name="street" placeholder="Your Street"></input>
//                 <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"></input> */}


//                 {formElementsArray.map(e => (
//                     < Input
//                         key={e.id}
//                         elementtype={e.config.elementType}
//                         elementConfig={e.config.elementConfig}
//                         value={e.config.value}
//                         invalid={!e.config.valid}
//                         touched={e.config.touched}
//                         shouldValidade={e.config.validation}
//                         changed={(event) => this.inputChangedHandler(event, e.id)}
//                     ></Input>
//                 ))
//                 }
//                 <Button inputtype="Success" disabled={!this.state.formIsValid}>ORDER</Button>
//             </form >
//         );
//         if (this.state.loading) {
//             form = <Spinner></Spinner>;
//         }
//         return (
//             <div className={classes.ContactData}>
//                 <h4>Enter your Contact Data</h4>
//                 {form}
//             </div>
//         );
//     }

// };



// export default ContactData;
import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliar/Auxiliar';
//import axios from 'axios';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        constructor(props) {
            super(props);
            //req > request
            //tem que retornar req para o BurguerBuilder e res=>res para o BurguerBuilder tbm
            axios.interceptors.response.use(req => {
                this.setState({ error: null })
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error })
            });
        }

        //Nesse Caso faz a verificação Depois de renderizar>>>tem que ser antes via Constructor
        // componentDidMount() {
        //     //req > request
        //     //tem que retornar req para o BurguerBuilder e res=>res para o BurguerBuilder tbm
        //     axios.interceptors.response.use(req => {
        //         this.setState({ error: null })
        //         return req;
        //     });
        //     axios.interceptors.response.use(res => res, error => {
        //         this.setState({ error: error })
        //     });
        // }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}



export default withErrorHandler;

//<Modal show> para ver a modal de Fail
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';



import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import burguerBuilderReducer from './store/reducers/burguerBuilder';
import orderReducer from './store/reducers/order'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
//reducer async
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    burguerBuilder: burguerBuilderReducer,
    order: orderReducer
})

//thunk > o middleware que quermos aplicar
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker();

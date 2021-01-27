import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder'
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';


// Route exact: como os dois começam com "/" com o link ./ os dois componentes vão ser renderizados > exact evita isso
//The <Switch /> component will only render the first route that matches/includes the path.

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          {/* <BurguerBuilder></BurguerBuilder>
          <Checkout></Checkout> */}

          {/* Aqui: não renderiza oura vez > renderiza tudo de primeira e só faz de conta que muda página */}

          <Switch>
            <Route path="/" exact component={BurguerBuilder} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/checkout" component={Checkout} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;

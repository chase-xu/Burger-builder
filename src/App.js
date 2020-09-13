import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Layout from './components/layout/layouts';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route, Switch} from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
        </Switch>
      </Layout>
    </div>
  
  );
}




export default App;



import React from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './components/layout/layouts'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>

  );
}

export default App;

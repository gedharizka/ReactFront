import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Container } from 'react-bootstrap';

import Catagori from './catagori';
import Variant from './variant/variant';
// import Produk from './variant/produk';
import NavbarMenu from './layout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './default/home';



function App() {
  return (

    <div>
      <Router>
        <NavbarMenu />
        <Container>
          <Switch>
            
            <Route exact path='/' component={Home} />
            <Route path='/Catagori' component={Catagori} />
            <Route path='/variant' component={Variant} />
            {/* <Route path='/Produk' component={Produk} /> */}

          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;








import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';


import Home from './Home';
import AddNinja from './AddNinja'
import Ninja from './Ninja'
import UpdateNinja from './UpdateNinja'

const App = () => {
    return (
      <BrowserRouter>
        <Navigation/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route  path="/addninja"  component={AddNinja}/>
          <Route  path="/updateninja/:id"  component={UpdateNinja}/>
          <Route  path="/ninja/:id" component={Ninja} />
        </Switch>
      </BrowserRouter>
    )
  }
  
  export default App;

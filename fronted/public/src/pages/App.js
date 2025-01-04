import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Transaction from './pages/Transaction';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/Home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/transaction" component={Transaction} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
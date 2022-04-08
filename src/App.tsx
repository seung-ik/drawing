import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Paint from './components/paint/Paint';
import Trade from './components/trade/Trade';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Paint} />
      <Route exact path="/trade" component={Trade} />
    </Switch>
  );
}

export default App;

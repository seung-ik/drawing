import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Paint from './components/paint/Paint';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Paint} />
      {/* <Route exact path="/" component={Main} />
      <Route path="/paint" component={Paint} />
      <Route path="/draw" component={Draw} /> */}
    </Switch>
  );
}

export default App;

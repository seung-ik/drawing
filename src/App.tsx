import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './components/main/Main';
import Paint from './components/paint/Paint';


function App() {
  return (
    <div>
      <div>alksjdfal</div>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/paint" component={Paint} />
      </Switch>
    </div>
  );
}

export default App;

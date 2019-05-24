import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import { App } from './renderer/App';
import { LargeViewComp } from './renderer/LargeViewComp';

ReactDOM.render(
  // <App></App>,
  <BrowserRouter >
    <div>
      <Switch>
        <Route exact path='/' component={App}></Route>
        <Route exact path='/LargeViewComp' component={LargeViewComp}></Route>
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById('app')

)


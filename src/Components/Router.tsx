/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../Routes/Home';
import Search from '../Routes/Search';
import TV from '../Routes/TV';
import Detail from '../Routes/Detail';

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/tv" component={TV} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:id" component={Detail} />
        <Route path="/show/:id" component={Detail} />
        <Route path="/" exact component={Home} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
};

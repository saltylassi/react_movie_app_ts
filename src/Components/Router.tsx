/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Movie from '../Routes/Movie/MoviePresenter';
import Search from '../Routes/Search';
import TV from '../Routes/TV/TVPresenter';
import Detail from '../Routes/Detail/DetailPresenter';
import Header from './Header';

export default () => {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route path="/" exact component={Movie} />
          <Route path="/tv" component={TV} />
          <Route path="/search" component={Search} />
          <Route path="/movie/:id" component={Detail} />
          <Route path="/show/:id" component={Detail} />
          <Redirect from="*" to="/" />
        </Switch>
      </>
    </Router>
  );
};

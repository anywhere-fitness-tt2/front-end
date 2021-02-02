import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers';


import App from './App';
import Login from './components/Login';
import Registration from './components/Registration';
import Header from './components/Header';
import theme from './theme/theme';
import ClientProfile from './components/ClientProfile';
import InstructorProfile from './components/InstructorProfile';

import 'normalize.css';
import './index.css';

const store = createStore(reducer, applyMiddleware(thunk, logger))
console.log(store.getState());

ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>
      <Header />
      <Provider store={store}>
      <Switch>
        <PrivateRoute exact path='/instructor-profile/:id' component={InstructorProfile} />
        <PrivateRoute exact path='/client-profile/:id' component={ClientProfile} />
        <Route exact path='/registration' component={Registration} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/' component={App} />
      </Switch>
      </Provider>
    </ThemeProvider>
  </Router>,
  document.getElementById('root'),
);

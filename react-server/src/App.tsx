import React from 'react';
import './App.css';
import { NavBar } from './Components/NavBarComponent/NavBar';
import { Login } from './Components/LoginComponent/Login';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'
import { Provider } from 'react-redux';
import { store } from './store';
import { Profile } from './Components/ProfileComponent/Profile';
import { AllUsers } from './Components/AllUsersComponent/AllUsers';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <NavBar />
          <Route path='/login' render={(props) => (<Login {...props} />)} />
          <Route path='/profile/:userId' component={Profile} />
          <Route path='/users' component={AllUsers} />
        </Router>
        <ToastContainer position='bottom-right'/>
      </Provider>
    </div>
  );
}
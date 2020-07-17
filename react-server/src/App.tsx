import React from 'react';
import { NavBar } from './Components/NavBarComponent/NavBar';
import { Login } from './Components/LoginComponent/Login';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'
import { Provider } from 'react-redux';
import { store } from './store';
import { Profile } from './Components/ProfileComponent/Profile';
import { AllUsers } from './Components/AllUsersComponent/AllUsers';
// import './App.css'
import { EditUser } from './Components/EditUserComponent/EditUser';
import { NewUser } from './Components/NewUserComponent/NewUser';
import { LogOut } from './Components/LogOutComponent/LogOut';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router >
          <NavBar />
          <Route path='/login' render={(props) => (<Login {...props} />)} />
          <Route path='/profile/:userId' component={Profile} />
          <Route path='/users' component={AllUsers}/>
          <Route path='/edituser' component={EditUser}/>
          <Route path='/new' component={NewUser}/>
          <Route path='/logout' component={LogOut}/>
        </Router>
        <ToastContainer position='bottom-right'/>
      </Provider>
    </div>
  );
}

export default App;
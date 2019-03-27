import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './css/App.scss';
import Navbar from './Navbar';
import Welcome from './Welcome';
import Error from './Error';
import ListUsers from './ListUsers';
import UserProfile from './UserProfile';
import NewUser from './NewUser';
import AdminLogin from './AdminLogin';
import UserHome from './UserHome';
import AdminHome from './AdminHome';
import MealPlan from './MealPlan';
import ProtectedRoute from './ProtectedRoute';
import UserSessions from './UserSessions'
import UserMealPlan from './UserMealPlan'
import AdminMealPlan from './AdminMealPlan'
import UserProfileView from './UserProfileView'
import IsLoggedInReRoute from './IsLoggedInReRoute'
import AdminSessions from './AdminSessions'
import ServerError from './ServerError'

require('dotenv').config()

class App extends Component {
  render() {
    return (
      <BrowserRouter>{/* Using react-router-dom */}
        <div className="App">
          <div className="content-container">
            <hr></hr>
            <Navbar />
            {/* Thanks Jon */}
            <Switch>
              <IsLoggedInReRoute path="/" component={Welcome} exact/>
              <IsLoggedInReRoute path="/admin" component={AdminLogin} exact/>
              <ProtectedRoute path="/admin/home" component={AdminHome} exact/>
              <ProtectedRoute path="/admin/sessions" component={AdminSessions} exact/>
              <ProtectedRoute path="/admin/users" component={ListUsers} exact/>
              <ProtectedRoute path="/admin/users/:id" component={UserProfile} exact/>
              <ProtectedRoute path="/admin/users/:id/mealplan" component={AdminMealPlan} exact/>
              <ProtectedRoute path="/admin/users/:id/new-mealplan" component={MealPlan} exact/>
              <ProtectedRoute path="/admin/new-user" component={NewUser} exact/>
              <ProtectedRoute path="/user/users/:id/home" component={UserHome} exact/>
              <ProtectedRoute path="/user/users/:id/sessions" component={UserSessions} exact/>
              <ProtectedRoute path="/user/users/:id/mealplan" component={UserMealPlan} exact/>
              <ProtectedRoute path="/user/users/:id/profile" component={UserProfileView} exact/>
              <Route path="/servererror" component={ServerError} exact/>
              <Route component={Error}/>{/* error page will render if the incorrect endpoint is entered */}
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminList from '../pages/AdminList/AdminList';
import CreateAdmin from '../pages/CreateAdmin';
import EditAdmin from '../pages/EditAdmin';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../utils/ProtectedRoute';
import AppBar from './appBar';
import Profile from '../pages/Profile/index';
export function Router() {
  return (
    <>
      <BrowserRouter>
        <AppBar />

        <Switch>
          <Route path="/login" exact component={Login} />
          <ProtectedRoute path="/adminList" component={AdminList} />
          <ProtectedRoute path="/createAdmin" component={CreateAdmin} />
          <ProtectedRoute path="/editAdmin/:id" component={EditAdmin} />
          <ProtectedRoute path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

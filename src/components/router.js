import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminList from '../pages/AdminList/AdminList';

import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../utils/ProtectedRoute';

export function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        <ProtectedRoute path="/adminList" component={AdminList} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

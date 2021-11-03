import { CssBaseline } from '@mui/material';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminList from './pages/AdminList/AdminList';
import Login from './pages/login';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const handleAuth = () => {
    setIsAuth(localStorage.getItem('TOKEN'));
  };

  return (
    <Router>
      <CssBaseline />
      <Switch>
        <Route path="/">
          <Login />
        </Route>
        <ProtectedRoute
          path="/adminList"
          component={AdminList}
          isAuth={isAuth}
        />
      </Switch>
    </Router>
  );
}

export default App;

import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function ProtectedRoute({ component: Component, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.user) {
          return <Component />;
        }

        return (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        );
      }}
    ></Route>
  );
}

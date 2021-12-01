import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { authState } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!!authState.token) {
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

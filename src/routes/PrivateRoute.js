import { Route, Redirect } from 'react-router-dom';
import checkAdminAuth from '../utils/adminAuth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkAdminAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
    }
  />
);

export default PrivateRoute;

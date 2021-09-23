import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Dashboard from '../components/pages/dashboard/Dashboard';
import Login from '../components/login/Login';
import MissingPage from '../components/error/MissingPage';
import UserListPage from '../components/pages/user/UserListPage';
import SingleUser from '../components/pages/user/User';
import PrivateRoute from './PrivateRoute';

const BaseRoute = () => (
  <Router>
    <Switch>
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute exact path="/users" component={UserListPage} />
      <PrivateRoute exact path="/user/:id" component={SingleUser} />
      <Route exact path="/login" component={Login} />
      <Route path="/404" component={MissingPage} />
      <Route path="*">
        <Redirect to="/404" />
      </Route>
    </Switch>
  </Router>
);

export default BaseRoute;

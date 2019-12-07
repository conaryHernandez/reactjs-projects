import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import * as actions from './store/actions';
import Spinner from './components/UI/Spinner/Spinner';

// routes
const BurgerBuilder = React.lazy(() => import('./containers/BurgerBuilder/BurgerBuilder'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'));


const App = (props) => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup])


  let routes = (
    <Switch>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/auth" component={Auth} />
      <Redirect to="/"/>
    </Switch>
  );

  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"/>
      </Switch>
    );
  }

  return (
    <div>
      <React.Suspense fallback={<Spinner />}>
        <Layout>
          {routes}
        </Layout>
      </React.Suspense>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== '',
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

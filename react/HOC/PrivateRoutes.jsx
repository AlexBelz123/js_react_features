import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Utils
import Spinner from '../components/utils/Spinner'; // custom spinner

const PrivateRoute = ({
  component: Component,
  auth: { isAuthorized, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      loading ? (
        <Spinner /> // show loader while fetching user
      ) : isAuthorized ? (
        <Component {...props} /> // if there is a user return original component
      ) : (
        <Redirect to="/login" /> // else redirect to login page
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);

import { Navigate, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ isLoggedIn, path, element }) {
  return isLoggedIn ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/newuserform" replace />
  );
}
export default PrivateRoute
PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  element: PropTypes.element.isRequired,
};

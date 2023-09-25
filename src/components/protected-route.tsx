import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

type TProps = {
  onlyUnAuth?: boolean;
  component: JSX.Element;
}

const Protected: React.FC<TProps> = ({ onlyUnAuth = false, component }) => {
  const location = useLocation();
  const isAuth = localStorage.getItem('accessToken');

  if (onlyUnAuth && isAuth) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
}


export const OnlyAuth = Protected;

export const OnlyUnAuth: React.FC<Omit<TProps, 'onlyUnAuth'>> = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);


Protected.propTypes = {
  onlyUnAuth: PropTypes.bool,
  component: PropTypes.element.isRequired,
}

OnlyUnAuth.propTypes = {
  component: PropTypes.element.isRequired,
}

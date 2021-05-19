import React from 'react';
import PropTypes from 'prop-types';

import Field from './Field';

import './login-form.scss';

const LoginForm = ({
  username,
  password,
  changeField,
  handleLogin,
  isLogged,
}) => {
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin();
  };
  
  return (
    <div className="login">
      {!isLogged && (
        <h2 className="login__title">Connexion <i className="fas fa-arrow-alt-circle-right"></i></h2>
      )}

      {!isLogged && (
        <form autoComplete="off" className="login__element" onSubmit={handleSubmit}>
          <Field
            name="username"
            placeholder="Adresse Email"
            onChange={changeField}
            value={username}
            required
          />
          <Field
            name="password"
            type="password"
            placeholder="Mot de passe"
            onChange={changeField}
            value={password}
            required
          />
          <button
            type="submit"
            className="login__button"
          >
            Valider
          </button>
        </form>
      )}

      {isLogged && (
        <>
        <p className="login__title">Bienvenue sur Facecook !</p>
        <p className="login__subtitle"><i className="fas fa-book-reader"></i></p>
        </>
      )}
    </div>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isLogged: PropTypes.bool,
  loggedMessage: PropTypes.string,
};

LoginForm.defaultProps = {
  isLogged: false,
  loggedMessage: 'Connecté',
};

export default LoginForm;

import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Login to Entertainment Hub</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
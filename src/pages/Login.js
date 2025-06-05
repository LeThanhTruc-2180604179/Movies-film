import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">NETFLIX FAKE</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
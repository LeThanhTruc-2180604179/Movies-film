import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Register</h1>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
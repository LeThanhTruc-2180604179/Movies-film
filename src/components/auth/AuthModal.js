import React from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModal = ({ type = 'login', onClose }) => {
  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button onClick={onClose} className="close-btn">
          <X size={24} />
        </button>
        <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
        {type === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default AuthModal;
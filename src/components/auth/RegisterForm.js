import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateName = (name) => {
    // Kiểm tra chỉ chấp nhận chữ cái, khoảng trắng và không có nhiều hơn 2 khoảng trắng liên tiếp
    const re = /^(?!.*\s{3})[\p{L}\s]*$/u;
    
    // Kiểm tra không được có 3 ký tự giống nhau liên tiếp
    const repeatingChars = /(.)\1{2,}/;
    
    // Kiểm tra phải có ít nhất 2 ký tự khác nhau
    const uniqueChars = new Set(name.toLowerCase().replace(/\s/g, '')).size;
    
    return re.test(name) && !repeatingChars.test(name) && uniqueChars >= 2;
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    return re.test(password);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    
    if (!value.trim()) {
      setNameError('Vui lòng nhập tên');
    } else if (!validateName(value)) {
      setNameError('Tên gồm 2 ký tự trở lên, Không có 3 ký tự giống nhau liên tiếp, bao gồm chữ và khoảng trắng,');
    } else if (value.length > 15) {
      setNameError('Độ dài tối đa 15 ký tự');
    } else {
      setNameError('');
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (!value.trim()) {
      setEmailError('Vui lòng nhập email');
    } else if (!validateEmail(value)) {
      setEmailError('Email không hợp lệ.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    if (!value.trim()) {
      setPasswordError('Vui lòng nhập mật khẩu');
    } else if (!validatePassword(value)) {
      setPasswordError('Mật khẩu tối thiểu 6 ký tự bao gồm ít nhất 1 chữ hoa, thường, ký tự đặc biệt.');
    } else {
      setPasswordError('');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name.trim()) {
      setNameError('Vui lòng nhập tên');
      setLoading(false);
      return;
    } else if (!validateName(name)) {
      setNameError('Tên gồm 2 ký tự trở lên, Không có 3 ký tự giống nhau liên tiếp, bao gồm chữ và khoảng trắng,');
      setLoading(false);
      return;
    } else if (name.length > 15) {
      setNameError('Độ dài tối đa 15 ký tự');
      setLoading(false);
      return;
    }

    if (!email.trim() || !password.trim() || emailError || passwordError) {
      setLoading(false);
      return;
    }

    const result = await register({ name, email, password });
    if (result.success) {
      navigate('/home');
    } else {
      setEmailError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="auth-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          required
          placeholder="Enter your name"
          className="input--modern"
          maxLength={15}
        />
        {nameError && <p className="error-message">{nameError}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
          placeholder="Enter your email"
          className="input--modern"
        />
        {emailError && emailError !== 'User with this email already exists' && (
          <p className="error-message">{emailError}</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="password-input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder="Create a password"
            className="input--modern"
          />
          <span className="password-toggle-icon" onClick={toggleShowPassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {passwordError && <p className="error-message">{passwordError}</p>}
      </div>
      <button type="button" onClick={handleSubmit} className="submit-btn" disabled={loading}>
        {loading ? 'Registering...' : 'Sign Up'}
      </button>
      <p className="auth-link">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
      {emailError && emailError === 'User with this email already exists' && (
        <p className="error-message" style={{ marginTop: '10px' }}>
          {emailError}
        </p>
      )}
    </div>
  );
};

export default RegisterForm;
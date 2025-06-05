import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Sử dụng react-icons cho biểu tượng con mắt

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State để theo dõi trạng thái hiển thị mật khẩu
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Chuyển đổi trạng thái hiển thị mật khẩu
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          className="input--modern"
        />
      </div>
      <div className="form-group password-container">
        <label htmlFor="password">Password</label>
        <div className="password-input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'} // Chuyển đổi type dựa trên showPassword
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className="input--modern"
          />
          <span className="password-toggle-icon" onClick={toggleShowPassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? 'Logging in...' : 'Sign In'}
      </button>
      <p className="auth-link">
        New to account? <Link to="/register">Create now!</Link>
      </p>
    </form>
  );
};

export default LoginForm;
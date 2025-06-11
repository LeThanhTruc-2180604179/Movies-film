import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import MovieCard from '../components/common/MovieCard';
import Loading from '../components/common/Loading';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Dashboard = () => {
  const { user, updateProfile, loading: authLoading } = useAuth();
  const { bookmarks, loading: appLoading } = useApp();
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState('');

  const validateName = (name) => {
    // Kiểm tra chỉ chấp nhận chữ cái, khoảng trắng và không có nhiều hơn 2 khoảng trắng liên tiếp
    const re = /^(?!.*\s{3})[\p{L}\s]*$/u;
    
    // Kiểm tra không được có 3 ký tự giống nhau liên tiếp
    const repeatingChars = /(.)\1{2,}/;
    
    // Kiểm tra phải có ít nhất 2 ký tự khác nhau
    const uniqueChars = new Set(name.toLowerCase().replace(/\s/g, '')).size;
    
    return re.test(name) && !repeatingChars.test(name) && uniqueChars >= 2;
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

    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError('Mật khẩu không khớp');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    if (!value.trim()) {
      setConfirmPasswordError('Vui lòng xác nhận mật khẩu');
    } else if (value !== password) {
      setConfirmPasswordError('Mật khẩu không khớp');
    } else {
      setConfirmPasswordError('');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSuccess('');

    if (!name.trim()) {
      setNameError('Vui lòng nhập tên');
      return;
    } else if (!validateName(name)) {
      setNameError('Tên gồm 2 ký tự trở lên, Không có 3 ký tự giống nhau liên tiếp, bao gồm chữ và khoảng trắng, ');
      return;
    } else if (name.length > 16) {
      setNameError('Tối đa 16 ký tự');
      return;
    }

    if (password) {
      if (!validatePassword(password)) {
        setPasswordError('Mật khẩu tối thiểu 6 ký tự bao gồm ít nhất 1 chữ hoa, thường, ký tự đặc biệt.');
        return;
      }
      if (password !== confirmPassword) {
        setConfirmPasswordError('Mật khẩu không khớp');
        return;
      }
    }

    const result = await updateProfile({ 
      name, 
      password: password ? password : undefined 
    });
    
    if (result.success) {
      setNameError('');
      setPasswordError('');
      setConfirmPasswordError('');
      setPassword('');
      setConfirmPassword('');
      setSuccess('Profile updated successfully!');
    } else {
      setPasswordError(result.error);
    }
  };

  if (authLoading || appLoading) {
    return <Loading text="Loading dashboard..." />;
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>👤 User Dashboard</h1>
        <p>Welcome, {user?.name || 'User'}!</p>
      </div>

      <div className="dashboard-content">
        <section className="profile-section">
          <h2>Update Profile</h2>
          <form onSubmit={handleUpdateProfile} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                required
                placeholder="Enter your name"
                className="input--modern"
                maxLength={30}
              />
              {nameError && <p className="error-message">{nameError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">New Password:</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  className="input--modern"
                />
                <span className="password-toggle-icon" onClick={toggleShowPassword}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {passwordError && <p className="error-message">{passwordError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Confirm new password"
                  className="input--modern"
                />
                <span className="password-toggle-icon" onClick={toggleShowConfirmPassword}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
            </div>
            {success && <p className="success-message">{success}</p>}
            <button type="submit" className="submit-btn" disabled={authLoading}>
              Update Profile
            </button>
          </form>
        </section>

        <section className="bookmarks-section">
          <h2>Your Bookmarks</h2>
          {bookmarks.length > 0 ? (
            <div className="content-grid">
              {bookmarks.map((item) => (
                <MovieCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No bookmarks yet</h3>
              <p>Start adding movies and TV series to your bookmarks!</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
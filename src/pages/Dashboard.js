import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import MovieCard from '../components/common/MovieCard';
import Loading from '../components/common/Loading';

const Dashboard = () => {
  const { user, updateProfile, loading: authLoading } = useAuth();
  const { bookmarks, loading: appLoading } = useApp();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const result = await updateProfile({ name, email });
    if (result.success) {
      setSuccess('Profile updated successfully!');
    } else {
      setError(result.error);
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
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <button type="submit" className="submit-btn">
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
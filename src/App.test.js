import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import App from './App';

test('renders Entertainment Hub logo', () => {
  render(
    <AuthProvider>
      <AppProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </AppProvider>
    </AuthProvider>
  );
  const logoElement = screen.getByText(/Entertainment Hub/i);
  expect(logoElement).toBeInTheDocument();
});
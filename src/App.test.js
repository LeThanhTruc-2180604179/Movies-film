import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import App from './App';

test('renders Entertainment Hub logo', () => {
  render(
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
  const logoElement = screen.getByText(/Entertainment Hub/i);
  expect(logoElement).toBeInTheDocument();
});
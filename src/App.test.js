import { render, screen } from '@testing-library/react';
import App from './App';

test('shows login screen', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
});

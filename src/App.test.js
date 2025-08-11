import { render, screen } from '@testing-library/react';
import App from './App';

test('renders default home heading', () => {
  render(<App />);
  const header = screen.getByText(/홈/i);
  expect(header).toBeInTheDocument();
});

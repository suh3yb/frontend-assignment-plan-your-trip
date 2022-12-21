import { render, screen } from '@testing-library/react';
import Layout from './Layout';

test('renders header and footer with expected texts', () => {
  render(<Layout />);
  expect(screen.getByRole('heading')).toHaveTextContent('Plan your trip!');
  expect(screen.getByText(/2014-2022 tiqets amsterdam/gi)).toBeInTheDocument();
});

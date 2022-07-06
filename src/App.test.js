import { render, screen } from '@testing-library/react';
import { Timer } from './App'

test('render main title', () => {
  render(<Timer />);
  const headerElement = screen.getByText('25 + 5 Clock');
  expect(headerElement).toBeInTheDocument();
});

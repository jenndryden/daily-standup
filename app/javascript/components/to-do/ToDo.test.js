
import React from 'react';
import { render } from '@testing-library/react';
import ToDo from './ToDo';

test('renders add todo input', () => {
  const { getByPlaceholderText } = render(<ToDo />);
  const addToDoInputElement = getByPlaceholderText(/What needs to be done?/i);
  expect(addToDoInputElement).toBeInTheDocument();
});
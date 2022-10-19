import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('App', () => {
  test('Testa o componente App', () => {
    renderWithRouterAndRedux(<App />);
  });
});

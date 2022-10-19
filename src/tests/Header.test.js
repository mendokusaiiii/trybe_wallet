import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Header from '../components/Header';
import { mockedValues, currency } from './helpers/mockData';

const INITIAL_STATE = {
  user: {
    email: 'teste@teste.com',
  },
  wallet: {
    currencies: currency,
    expenses: mockedValues,
    editor: false,
    idToEdit: 0,
  },
};

describe('Testa o componente Header', () => {
  test('Testa se os componentes no header estão renderizando', () => {
    renderWithRouterAndRedux(<Header />, { initialState: INITIAL_STATE });
    const user = screen.getByTestId('email-field');
    expect(user).toBeInTheDocument();
    expect(user).toHaveTextContent('teste@teste.com');
    const total = screen.getByTestId('total-field');
    expect(total).toBeDefined();
    // expect(total).toBe('384,89');
    const current = screen.getByTestId('header-currency-field');
    expect(current).toBeDefined();
    expect(current).toHaveTextContent('BRL');
  });
});

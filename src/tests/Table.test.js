import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Table from '../components/Table';
import { currency, mockedValues } from './helpers/mockData';

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

describe('Testa o componente Table', () => {
  test('Testa se o componente Table funciona corretamente', () => {
    renderWithRouterAndRedux(<Table />, { initialState: INITIAL_STATE });

    const btnDelet = screen.getAllByTestId('delete-btn');
    expect(btnDelet).toHaveLength(2);

    const btnEdit = screen.getAllByTestId('edit-btn');
    expect(btnEdit).toHaveLength(2);

    userEvent.click(btnDelet[0]);

    expect(screen.getAllByTestId('delete-btn')).toHaveLength(1);
    expect(screen.getAllByTestId('edit-btn')).toHaveLength(1);

    userEvent.click(screen.getByTestId('edit-btn'));
  });
});

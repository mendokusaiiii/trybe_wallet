import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import WalletForm from '../../components/WalletForm';
import Wallet from '../../pages/Wallet';
import { currency, mockedValues } from './mockData';

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
const value = 'value-input';
const description = 'description-input';
const currenc = 'currency-input';
const method = 'method-input';
const debit = 'Cartão de débito';
describe(' Testa se o componente WalletForm está funcionando corretamente', () => {
  test('Testa se o componente WalletForm renderiza corretamente', () => {
    renderWithRouterAndRedux(<WalletForm />, { initialState: INITIAL_STATE });
    const valueInput = screen.getByTestId(value);
    const descriptionInput = screen.getByTestId(description);
    const currencyInput = screen.getByTestId(currenc);
    const methodInput = screen.getByTestId(method);
    const debitCard = debit;

    expect(valueInput).toBeInTheDocument();
    expect(valueInput).toHaveTextContent('');
    expect(descriptionInput).toBeInTheDocument();
    expect(descriptionInput).toHaveTextContent('');
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    const tagInput = screen.getByTestId('tag-input');
    expect(tagInput).toBeInTheDocument();
    const btnAddExpense = screen.getByRole('button', { name: /Adicionar despesa/i });
    expect(btnAddExpense).toBeInTheDocument();

    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'teste1');
    userEvent.selectOptions(currencyInput, 'USD');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Lazer');
    userEvent.click(btnAddExpense);

    userEvent.selectOptions(currencyInput, 'BTC');
    expect(screen.getByText('BTC').selected).toBeTruthy();

    userEvent.selectOptions(methodInput, debitCard);
    expect(screen.getByText(debitCard).selected).toBeTruthy();

    userEvent.selectOptions(tagInput, 'Trabalho');
    expect(screen.getByText('Trabalho').selected).toBeTruthy();
  });

  test('Testa se o campo de edição funciona corretamente', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });
    const valueInput = screen.getByTestId(value);
    const descriptionInput = screen.getByTestId(description);
    const currencyInput = screen.getByTestId(currenc);
    const methodInput = screen.getByTestId(method);
    const debitCard = debit;
    const tagInput = screen.getByTestId('tag-input');

    userEvent.type(valueInput, '1');
    userEvent.type(descriptionInput, '1');
    userEvent.click(screen.getByRole('button', { name: 'Adicionar despesa' }));

    userEvent.click(screen.getAllByRole('button', { name: 'Editar' })[0]);
    userEvent.type(valueInput, '2');
    userEvent.type(descriptionInput, '2');
    userEvent.selectOptions(currencyInput, 'USD');
    userEvent.selectOptions(methodInput, debitCard);
    userEvent.selectOptions(tagInput, 'Trabalho');

    expect(screen.getByRole('button', { name: 'Editar despesa' })).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Editar despesa' }));
    expect(await screen.findByRole('cell', { name: '12.00' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: '12' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: 'Dólar Americano/Real Brasileiro' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: debitCard })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: 'Trabalho' })).toBeInTheDocument();
  });

  test('Testa se os botões estão funcioando corretamente', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });
    const valueInput = screen.getByTestId(value);
    const descriptionInput = screen.getByTestId(description);
    const currencyInput = screen.getByTestId(currenc);
    const methodInput = screen.getByTestId(method);
    const debitCard = debit;
    const tagInput = screen.getByTestId('tag-input');
    console.log(currencyInput);
    userEvent.type(valueInput, '1');
    userEvent.type(descriptionInput, '1');
    userEvent.selectOptions(currencyInput, 'USD');
    userEvent.selectOptions(methodInput, debitCard);
    userEvent.selectOptions(tagInput, 'Trabalho');
    userEvent.click(screen.getByRole('button', { name: 'Adicionar despesa' }));

    expect(await screen.findByRole('cell', { name: '1.00' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: '1' })).toBeInTheDocument();
    const cellRole = await screen.findAllByRole('cell', { name: /dólar americano\/real brasileiro/i });
    expect(cellRole[0]).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: debitCard })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: 'Trabalho' })).toBeInTheDocument();
    const real = await screen.findAllByRole('cell', { name: 'Real' });
    expect(real[0]).toBeInTheDocument();
  });
});

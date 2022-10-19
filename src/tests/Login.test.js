import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testando a pagina de Login', () => {
  test('Testa se o email-input está funcionando corretamente:', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByPlaceholderText(/email/i);
    expect(email).toBeInTheDocument();
  });
  test('Testa se o password-input funciona corretamente:', () => {
    renderWithRouterAndRedux(<App />);
    const password = screen.getByPlaceholderText(/password/i);
    expect(password).toBeInTheDocument();
  });
  test('Testa se o botão de login está funcionando corretamente:', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();
  });
  test('Testa se o botão muda de rota ao ser clickado', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });
  test('Testa se o botão muda de rota', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(email, 'trybe@trybe.com');
    userEvent.type(password, '1234567890');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
  });
});

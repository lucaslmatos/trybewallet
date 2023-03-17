import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

const email = 'lucaslopesm_22@hotmail.com';

describe('Testes: Página de Login.', () => {
  test('Deve existir o campo de email, senha e do botão de entrar', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByRole('textbox', { name: /Email/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Senha:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
  });
  test('O botão de entrar deve estar habilitado apenas após o usuário digitar email e senha válidos', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeDisabled();
    userEvent.type(screen.getByRole('textbox', { name: /Email/i }), email);
    userEvent.type(screen.getByLabelText('Senha:'), '123456');
    expect(screen.getByRole('button', { name: /Entrar/i })).not.toBeDisabled();
  });
});

describe('Testes: Carteira', () => {
  test('Ao entrar na carteira, devem aparecer as informações corretas no Header', () => {
    renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByRole('textbox', { name: /Email/i }), email);
    userEvent.type(screen.getByLabelText('Senha:'), '123456');
    userEvent.click(screen.getByRole('button', { name: /Entrar/i }));
    expect(screen.getByText(`Email:${email}`)).toBeInTheDocument();
    expect(screen.getByTestId('total-field')).toBeInTheDocument();
    expect(screen.getByTestId('header-currency-field')).toBeInTheDocument();
  });
  test('Ao entrar na carteira, devem aparecer todos os campos corretos', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });
    expect(screen.getByTestId('value-input')).toBeInTheDocument();
    expect(screen.getByTestId('currency-input')).toBeInTheDocument();
    expect(screen.getByTestId('description-input')).toBeInTheDocument();
    expect(screen.getByTestId('tag-input')).toBeInTheDocument();
    expect(screen.getByTestId('method-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Adicionar despesa/i })).toBeInTheDocument();
  });
});

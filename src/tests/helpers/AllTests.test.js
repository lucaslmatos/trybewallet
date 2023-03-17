import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

const email = 'lucaslopesm_22@hotmail.com';
const valor = 'value-input';
const desc = 'description-input';

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
    expect(screen.getByTestId(valor)).toBeInTheDocument();
    expect(screen.getByTestId('currency-input')).toBeInTheDocument();
    expect(screen.getByTestId(desc)).toBeInTheDocument();
    expect(screen.getByTestId('tag-input')).toBeInTheDocument();
    expect(screen.getByTestId('method-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Adicionar despesa/i })).toBeInTheDocument();
  });
});

describe('Testes: Interação do usuário', () => {
  test('Ao adicionar uma despesa, ela aparece na tela, e os botões de editar e excluir aparecem e se comportam de forma correta', async () => {
    renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByRole('textbox', { name: /Email/i }), email);
    userEvent.type(screen.getByLabelText('Senha:'), '123456');
    userEvent.click(screen.getByRole('button', { name: /Entrar/i }));
    userEvent.type(screen.getByTestId(valor), '300');
    userEvent.type(screen.getByTestId(desc), 'Resident Evil 4 Remake');
    userEvent.click(screen.getByRole('button', { name: /Adicionar despesa/i }));
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Deletar/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Editar/i })).toBeInTheDocument();
    });
    userEvent.click(screen.getByRole('button', { name: /Editar/i }));
    expect(screen.getByRole('button', { name: /Editar despesa/i })).toBeInTheDocument();
    userEvent.type(screen.getByTestId(valor), '320');
    userEvent.click(screen.getByRole('button', { name: /Editar despesa/i }));
    userEvent.type(screen.getByTestId(valor), '200');
    userEvent.type(screen.getByTestId(desc), 'GOW Ragnarok');
    userEvent.click(screen.getByRole('button', { name: /Adicionar despesa/i }));
    userEvent.click(screen.getAllByRole('button', { name: /Deletar/i })[0]);
    await waitFor(() => {
      expect(screen.getAllByRole('button', { name: /Deletar/i })).toHaveLength(1);
      expect(screen.getAllByRole('button', { name: /Editar/i })).toHaveLength(1);
    });
  });
});

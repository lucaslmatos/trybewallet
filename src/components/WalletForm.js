import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionFetchAPI } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetchAPI());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="Valor">Valor da despesa: </label>
          <input
            type="text"
            data-testid="value-input"
            name="Valor"
          />
          <label htmlFor="Descrição">Descrição: </label>
          <input
            type="text"
            data-testid="description-input"
            name="Descrição"
          />
          <label htmlFor="currencies">Escolha a moeda: </label>
          <select name="currencies" id="currencies" data-testid="currency-input">
            { currencies.map((e, index) => (
              <option key={ index }>{ e }</option>
            ))}
          </select>
          <label htmlFor="payment">Escolha o método de pagamento: </label>
          <select name="payment" id="payment" data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <label htmlFor="payment">Escolha a categoria da despesa: </label>
          <select name="payment" id="payment" data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);

WalletForm.propTypes = {}.isRequired;

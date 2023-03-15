import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionFetchAPI, UpExpensesAPI, editedExpense } from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetchAPI());
  }

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(UpExpensesAPI(this.state));
    this.setState({
      value: '',
      description: '',
    });
  };

  handleEditClick = () => {
    const { dispatch, idToEdit } = this.props;
    dispatch(editedExpense(this.state, idToEdit));
    this.setState({
      value: '',
      description: '',
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="Valor">Valor da despesa: </label>
          <input
            type="text"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
          <label htmlFor="Descrição">Descrição: </label>
          <input
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
          <label htmlFor="currencies">Escolha a moeda: </label>
          <select
            name="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ currency }
          >
            { currencies.map((e, index) => (
              <option key={ index }>{ e }</option>
            ))}
          </select>
          <label htmlFor="payment">Escolha o método de pagamento: </label>
          <select
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <label htmlFor="payment">Escolha a categoria da despesa: </label>
          <select
            name="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          {
            !editor
              ? (
                <button
                  type="button"
                  onClick={ this.handleClick }
                >
                  Adicionar despesa
                </button>
              )
              : (
                <button
                  type="button"
                  onClick={ this.handleEditClick }
                >
                  Editar despesa
                </button>
              )
          }
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

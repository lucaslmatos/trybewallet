import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  handleClick = ({ target }) => {
    const { dispatch, expenses } = this.props;
    const newExpenses = expenses.filter((exp) => exp.id !== Number(target.id));
    dispatch(deleteExpense(newExpenses));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={ exp.id }>
              <td>{ exp.description }</td>
              <td>{ exp.tag }</td>
              <td>{ exp.method }</td>
              <td>{ parseFloat(exp.value).toFixed(2) }</td>
              <td>{ exp.currency }</td>
              <td>BRL</td>
              <td>
                {
                  parseFloat(exp.value * exp.exchangeRates[exp.currency].ask).toFixed(2)
                }
                /
                {
                  parseFloat(exp.exchangeRates[exp.currency].ask).toFixed(2)
                }
              </td>
              <td>{ exp.exchangeRates[exp.currency].name }</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ this.handleClick }
                  name="delete"
                  id={ exp.id }
                >
                  Deletar
                </button>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ this.handleClick }
                  name="edit"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {}.isRequired;

export default connect(mapStateToProps)(Table);

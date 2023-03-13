import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
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
          {expenses.map((exp, index) => (
            <tr key={ index }>
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

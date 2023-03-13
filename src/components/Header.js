import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalPrice = expenses.reduce((acumulado, valoresAtuais) => {
      const { currency, exchangeRates, value } = valoresAtuais;
      const { ask } = exchangeRates[currency];
      return (acumulado + parseFloat(value * ask));
    }, 0);
    return (
      <div>
        <div data-testid="email-field">
          Email:
          { email }
        </div>
        <span data-testid="total-field">
          { totalPrice.toFixed(2) }
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({ })).isRequired,
};

export default connect(mapStateToProps)(Header);

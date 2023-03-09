import React, { Component } from 'react';
import store from '../redux/store';

class Header extends Component {
  render() {
    return (
      <div>
        <div data-testid="email-field">
          Email:
          { store.getState().user.email }
        </div>
        <span data-testid="total-field">
          Despesa total:
          { 0 }
        </span>
        <span data-testid="header-currency-field">
          { }
          BRL
        </span>
      </div>
    );
  }
}

export default Header;

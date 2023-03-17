import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { UpEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    emailValue: '',
    passwordValue: '',
    emailCheck: true,
  };

  onLoginBtnClick = () => {
    const { history, dispatch } = this.props;
    const { emailValue } = this.state;
    dispatch(UpEmail(emailValue));
    history.push('/carteira');
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  validateEmail = ({ target }) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-_]+\.[A-Za-z]{2,}$/;
    this.setState({
      [target.name]: target.value,
    });
    if (regex.test(target.value)) {
      this.setState({
        emailCheck: false,
      });
    } else {
      this.setState({
        emailCheck: true,
      });
    }
  };

  render() {
    const { emailCheck, emailValue, passwordValue } = this.state;
    const min = 6;
    return (
      <div>
        <form>
          <label>
            Email:
            <input
              type="email"
              data-testid="email-input"
              name="emailValue"
              value={ emailValue }
              onChange={ this.validateEmail }
            />
          </label>
          <label>
            Senha:
            <input
              type="password"
              data-testid="password-input"
              name="passwordValue"
              value={ passwordValue }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ emailCheck || passwordValue.length < min }
            name="enterBtn"
            onClick={ this.onLoginBtnClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: () => {},
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

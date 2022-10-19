import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitEmail } from '../redux/actions/index';

const PASSWORD_LENGTH = 5;
class Login extends React.Component {
  state = {
    email: '',
    password: '',
    submitDisable: true,
  };

  handleChange = (event) => {
    const { email, password } = this.state;
    const { target: { name, value } } = event;
    this.setState({ [name]: value }, this.verify);
    if (email.includes('@')
      && email.includes('.com')
      && password.length >= PASSWORD_LENGTH
    ) {
      this.setState({ submitDisable: false });
    } else {
      this.setState({ submitDisable: true });
    }
  };

  handleSubmitForm = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(submitEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, submitDisable } = this.state;
    return (
      <section>
        <form>
          <h1>Sign In</h1>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              id="email"
              value={ email }
              placeholder="Email"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              value={ password }
              placeholder="Password"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ submitDisable }
            onClick={ this.handleSubmitForm }
          >
            Entrar
          </button>

        </form>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
}.isRequired;

export default connect()(Login);

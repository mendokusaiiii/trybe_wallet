import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitEmail as submitEmailAction } from '../redux/actions/index';

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
    this.setState({ [name]: value });
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
    const { submitEmail } = this.props;
    const { email } = this.state;
    submitEmail(email);
  };

  render() {
    const { email, password, submitDisable } = this.state;
    return (
      <section>
        <form method="POST" className="form-login">
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
          <Link to="/carteira" className="link-login">
            <button
              data-testid="button-login"
              type="submit"
              disabled={ submitDisable }
              onClick={ this.handleSubmitForm }
            >
              Sign In
            </button>
          </Link>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  submitEmail: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  submitEmail: (param) => (
    dispatch(submitEmailAction(param))),
});

export default connect(null, mapDispatchToProps)(Login);

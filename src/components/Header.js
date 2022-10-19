import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <section className="header">
        <div>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">
            {total}
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </section>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  total: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Header);

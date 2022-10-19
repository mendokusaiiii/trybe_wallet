import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  totalExpenses = () => {
    const { expenses } = this.props;
    const values = expenses.map((index) => {
      const arrExchange = Object.entries(index.exchangeRates);
      const currencyCurrent = arrExchange.find((el) => el[0] === index.currency);
      console.log(currencyCurrent);
      return Number(index.value) * Number(currencyCurrent[1].ask);
    });
    return values.reduce((partialSum, a) => partialSum + a, 0);
  };

  render() {
    const { email } = this.props;
    return (
      <section className="header">
        <div>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">
            {
              this.totalExpenses().toFixed(2)
              // new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
              //   .format(this.totalExpenses().toFixed(2)).substring(NUMBER)
              // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
            }
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </section>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  allValueBRL: state.wallet.allValueBRL,
});

export default connect(mapStateToProps)(Header);

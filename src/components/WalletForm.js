import React, { Component } from 'react';
import { connect } from 'react-redux';
import currenciesAPI from '../services/currenciesAPI';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(currenciesAPI());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { currencies } = this.props;
    const { value, description } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value" className="wallet-label">
            <input
              type="number"
              name="value"
              id="value"
              data-testid="value-input"
              placeholder="Valor"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>
          <label htmlFor="description">
            <input
              type="text"
              name="description"
              id="description"
              data-testid="description-input"
              placeholder="Descrição"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          <label htmlFor="currency">
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
            >
              {
                currencies.map((elCurrency, index) => (
                  <option key={ index }>{elCurrency}</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method">
            <select
              name="method"
              id="method"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);

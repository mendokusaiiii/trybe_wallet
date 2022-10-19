import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import currenciesAPI from '../services/currenciesAPI';
import {
  dispatchAPI,
  sumExpenses as sumExpensesAction,
  allExpenses as allExpensesAction,
} from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    this.requestAPI();
  }

  requestAPI = async () => {
    const { dispatchAPIS } = this.props;
    console.log(dispatchAPIS);
    await dispatchAPIS();
  };

  fetchCurrentAPI = async () => {
    const response = await currenciesAPI();
    return response;
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.verify);
  };

  handleSubmitForm = async (event) => {
    event.preventDefault();
    const { sumExpenses } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const changeCurrent = await this.fetchCurrentAPI();
    const currencyObj = {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: changeCurrent,
    };
    sumExpenses(currencyObj);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency } = this.state;
    console.log(currencies);
    return (
      <div>
        <form>
          <label htmlFor="value">
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
                currencies.map((current) => (
                  <option key={ current } value={ current }>{current}</option>
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
            <button
              type="submit"
              onClick={ this.handleSubmitForm }
            >
              Adicionar despesa

            </button>
          </label>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.array,
  dispatchAPIS: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchAPIS: () => (dispatch(dispatchAPI())),
  sumExpenses: (currencyObj) => (dispatch(sumExpensesAction(currencyObj))),
  allExpenses: (allValueBRL) => (dispatch(allExpensesAction(allValueBRL))),

});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

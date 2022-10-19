import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import currenciesAPI from '../services/currenciesAPI';
import {
  dispatchAPI,
  sumExpenses as sumExpensesAction,
  allExpenses as allExpensesAction,
  arrExpenses as arrExpensesAction,
} from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    sumAllExpenses: 0,
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
    const { sumExpenses, allExpenses, expenses } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
      sumAllExpenses,
    } = this.state;
    const changeCurrent = await this.fetchCurrentAPI();
    const currencyObj = {
      id: expenses.length,
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
    const numericValues = Number(value);
    const exchanges = changeCurrent[currency].ask;
    const valueBRL = exchanges * numericValues;
    const allValues = sumAllExpenses + valueBRL;
    allExpenses(allValues);
    this.setState({ sumAllExpenses: allValues });
  };

  handleEditForm = async (event) => {
    event.preventDefault();
    const { expenses, idToEdit, arrExpenses } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const allExpValue = expenses.find((element) => element.id === idToEdit);
    const expenseEdit = {
      value,
      description,
      currency,
      method,
      tag,
      id: idToEdit,
      exchangeRates: allExpValue.exchangeRates,
    };
    const deleteExpense = expenses.filter((element) => element.id !== idToEdit);
    arrExpenses(deleteExpense);
    const newArr = [...deleteExpense, expenseEdit];
    arrExpenses(newArr.sort((a, b) => a.id - b.id));
  };

  render() {
    const { currencies, edition } = this.props;
    const { value, description, currency, method, tag } = this.state;
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
              value={ method }
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
              value={ tag }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
            {
              edition ? (
                <button
                  type="button"
                  onClick={ this.handleEditForm }
                >
                  Editar despesa

                </button>

              ) : (
                <button
                  type="button"
                  onClick={ this.handleSubmitForm }
                >
                  Adicionar despesa

                </button>
              )
            }
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
  edition: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  allValueBRL: state.wallet.allValueBRL,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchAPIS: () => (dispatch(dispatchAPI())),
  sumExpenses: (currencyObj) => (dispatch(sumExpensesAction(currencyObj))),
  allExpenses: (allValueBRL) => (dispatch(allExpensesAction(allValueBRL))),
  arrExpenses: (newArr) => (dispatch(arrExpensesAction(newArr))),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

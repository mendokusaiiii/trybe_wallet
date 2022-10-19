import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  sumEdit as sumEditAction,
  arrExpenses as arrExpensesAction,
} from '../redux/actions';

class Table extends Component {
  deleteExpenses = (id) => {
    const { expenses, arrExpenses } = this.props;
    const newExpenses = expenses.filter((element) => element.id !== id);
    arrExpenses(newExpenses);
  };

  render() {
    const { expenses, sumEdit } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((element) => {
              const current = Object.values(element.exchangeRates !== undefined
                && element.exchangeRates).find((coin) => coin.code === element.currency);
              return (
                <tr key={ element.id }>
                  <td>{element.description}</td>
                  <td>{element.tag}</td>
                  <td>{element.method}</td>
                  <td>{Number(element.value).toFixed(2)}</td>
                  <td>{current.name}</td>
                  <td>{Number(current.ask).toFixed(2)}</td>
                  <td>{(Number(current.ask) * element.value).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => sumEdit(element.id) }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.deleteExpenses(element.id) }
                    >
                      Deletar
                    </button>

                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  allValueBRL: state.wallet.allValueBRL,
});

const mapDispatchToProps = (dispatch) => ({
  arrExpenses: (newExpenses) => (dispatch(arrExpensesAction(newExpenses))),
  sumEdit: (id) => (dispatch(sumEditAction(id))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

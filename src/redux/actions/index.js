import currenciesAPI from '../../services/currenciesAPI';

export const SUBMIT_EMAIL = 'SUBMIT_EMAIL';
export const submitEmail = (email) => ({
  type: SUBMIT_EMAIL,
  payload: {
    email,
  },
});

export const REQUEST_API = 'REQUEST_API';
export const requestAPI = (currencies) => ({
  type: REQUEST_API,
  payload: {
    currencies,
  },
});

export const removeFromAPI = () => async (dispatch) => {
  const response = await currenciesAPI();
  delete response.USDT;
  dispatch(requestAPI(response));
};

export const SUM_EXPENSES = 'SUM_EXPENSES';
export const sumExpenses = (expenses) => ({
  type: SUM_EXPENSES,
  payload: {
    expenses,
  },
});

export const ARR_EXPENSES = 'ARR_EXPENSES';
export const arrExpenses = (arr) => ({
  type: ARR_EXPENSES,
  payload: {
    arr,
  },
});

export const ALL_EXPENSES = 'ALL_EXPENSES';
export const allExpenses = (allValueBRL) => ({
  type: ALL_EXPENSES,
  payload: {
    allValueBRL,
  },
});

export const SUM_EDIT = 'SUM_EDIT';
export const sumEdit = (idToEdit) => ({
  type: SUM_EDIT,
  payload: {
    idToEdit,
  },
});

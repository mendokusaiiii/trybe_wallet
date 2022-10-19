import {
  REQUEST_API,
  DATA,
  FAIL_TO_CONNECT,
  SUM_EXPENSES,
  ALL_EXPENSES,
  ARR_EXPENSES,
  SUM_EDIT,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  allValueBRL: 0,
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API: {
    return {
      ...state,
      loading: true,
    };
  }
  case DATA:
    return {
      ...state,
      currencies: action.data,
      error: '',
      loading: false,
    };
  case FAIL_TO_CONNECT:
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  case SUM_EXPENSES: {
    return {
      ...state,
      expenses: state.expenses.concat(action.expenses),
    };
  }
  case ALL_EXPENSES: {
    return {
      ...state,
      allValueBRL: action.payload.allValueBRL,
      editor: false,
    };
  }
  case ARR_EXPENSES: {
    return {
      ...state,
      expenses: action.payload.arr,
      editor: false,
    };
  }
  case SUM_EDIT: {
    return {
      ...state,
      idToEdit: action.payload.idToEdit,
      editor: true,
    };
  }
  default:
    return state;
  }
};

export default wallet;

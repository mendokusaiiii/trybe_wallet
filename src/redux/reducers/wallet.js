import {
  REQUEST_API,
  SUM_EXPENSES,
  ARR_EXPENSES,
  ALL_EXPENSES,
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
      currencies: Object.keys(action.payload.currencies),
    };
  }
  case SUM_EXPENSES: {
    return {
      ...state,
      expenses: state.expenses.concat(action.payload.expenses),
    };
  }
  case ARR_EXPENSES: {
    return {
      ...state,
      expenses: action.payload.expenses,
      editor: false,
    };
  }
  case ALL_EXPENSES: {
    return {
      ...state,
      allValueBRL: action.payload.allValueBRL,
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

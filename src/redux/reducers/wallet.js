import { UPDATE_CURRENCIES, UPDATE_EXPENSES, DELETE_EXPENSE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case UPDATE_EXPENSES:
    action.expense.id = state.expenses.length;
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.expense,
    };
  default:
    return state;
  }
};

export default wallet;

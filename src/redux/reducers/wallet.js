import { UPDATE_CURRENCIES,
  UPDATE_EXPENSES, DELETE_EXPENSE, EDIT_EXPENSE, EDITED_EXPENSE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  const expenseList = state.expenses;
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
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  case EDITED_EXPENSE:
    expenseList[action.id].description = action.expense.description;
    expenseList[action.id].value = action.expense.value;
    expenseList[action.id].currency = action.expense.currency;
    expenseList[action.id].tag = action.expense.tag;
    expenseList[action.id].method = action.expense.method;
    return {
      ...state,
      expenses: [...state.expenses],
      editor: false,
      idToEdit: 0,
    };
  default:
    return state;
  }
};

export default wallet;

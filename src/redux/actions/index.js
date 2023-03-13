export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_CURRENCIES = 'UPDATE_CURRENCIES';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const UpEmail = (state) => ({
  type: UPDATE_EMAIL,
  email: state,
});

export const UpCurrencies = (state) => ({
  type: UPDATE_CURRENCIES,
  currencies: state,
});

export const deleteExpense = (state) => ({
  type: DELETE_EXPENSE,
  expense: state,
});

const Upexpenses = ({ value, description, currency, method, tag }, exchangeRates) => ({
  type: UPDATE_EXPENSES,
  expense: { id: 0, value, description, currency, method, tag, exchangeRates },
});

export function UpExpensesAPI(state) {
  return async (dispatch) => {
    const data = await fetch('https://economia.awesomeapi.com.br/json/all');
    const newdata = await data.json();
    delete newdata.USDT;
    dispatch(Upexpenses(state, newdata));
  };
}

const fetchAPI = async (dispatch) => {
  const data = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currenciesList = await data.json();
  const currenciesListArray = Object.keys(currenciesList);
  const currenciesFinal = currenciesListArray
    .filter((e) => e !== 'USDT');
  dispatch(UpCurrencies(currenciesFinal));
};

export const actionFetchAPI = () => fetchAPI;

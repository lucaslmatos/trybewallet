export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_CURRENCIES = 'UPDATE_CURRENCIES';

export const UpEmail = (state) => ({
  type: UPDATE_EMAIL,
  email: state,
});

export const UpCurrencies = (state) => ({
  type: UPDATE_CURRENCIES,
  currencies: state,
});

const fetchAPI = async (dispatch) => {
  const data = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currenciesList = await data.json();
  const currenciesListArray = Object.keys(currenciesList);
  const currenciesFinal = currenciesListArray
    .filter((e) => e !== 'USDT');
  dispatch(UpCurrencies(currenciesFinal));
};

export const actionFetchAPI = () => fetchAPI;

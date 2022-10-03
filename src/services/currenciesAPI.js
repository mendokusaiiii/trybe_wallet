const url = 'https://economia.awesomeapi.com.br/json/all';

const currenciesAPI = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default currenciesAPI;

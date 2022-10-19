const url = 'https://economia.awesomeapi.com.br/json/all';

const currenciesAPI = async () => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  delete data.USDT;
  console.log(Object.keys(data));
  return Object.keys(data);
};

export default currenciesAPI;

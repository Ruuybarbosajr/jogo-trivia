export const fetchQuestions = async (token) => {
  const ENDPOINT = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await (await fetch(ENDPOINT)).json();
  return response;
};

export const fetchToken = async () => {
  const ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
  const response = await (await fetch(ENDPOINT)).json();
  localStorage.setItem('token', response.token);
  return response.token;
};

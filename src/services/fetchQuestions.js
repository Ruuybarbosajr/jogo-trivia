const fetchQuestions = async (token) => {
  const ENDPOINT = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await (await fetch(ENDPOINT)).json();
  return response;
};

export default fetchQuestions;

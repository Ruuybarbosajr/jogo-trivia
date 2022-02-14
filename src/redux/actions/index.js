export const PLAYER_LOGIN = 'PLAYER_LOGIN';
export const TOKEN_REQUEST = 'TOKEN_REQUEST';

export const playerLoginInputs = (payload) => ({
  type: PLAYER_LOGIN,
  payload,
});

const updateToken = (payload) => ({
  type: TOKEN_REQUEST,
  payload,
});

export const getToken = () => async (dispatch) => {
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((data) => {
      dispatch(updateToken(data));
    });
};
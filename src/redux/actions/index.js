export const PLAYER_LOGIN = 'PLAYER_LOGIN';
export const TOKEN_REQUEST = 'TOKEN_REQUEST';

export const playerLoginInputs = (payload) => ({
  type: PLAYER_LOGIN,
  payload,
});

export const updateToken = (payload) => ({
  type: TOKEN_REQUEST,
  payload,
});

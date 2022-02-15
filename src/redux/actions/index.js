export const PLAYER_LOGIN = 'PLAYER_LOGIN';
export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const SCORE_PLAYER = 'SCORE_PLAYER';
export const PICTURE_PLAYER = 'PICTURE_PLAYER';

export const playerLoginInputs = (payload) => ({
  type: PLAYER_LOGIN,
  payload,
});

export const updateToken = (payload) => ({
  type: TOKEN_REQUEST,
  payload,
});

export const updateScore = (payload) => ({
  type: SCORE_PLAYER,
  payload,
});

export const getUrlPicture = (payload) => ({
  type: PICTURE_PLAYER,
  payload,
});

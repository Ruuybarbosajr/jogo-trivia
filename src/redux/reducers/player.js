import { PLAYER_LOGIN, SCORE_PLAYER, PICTURE_PLAYER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  picture: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PICTURE_PLAYER:
    return {
      ...state,
      picture: action.payload,
    };

  case SCORE_PLAYER:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };

  case PLAYER_LOGIN:
    return {
      ...state,
      name: action.payload.player,
      gravatarEmail: action.payload.email,
    };
  default:
    return state;
  }
};

export default player;

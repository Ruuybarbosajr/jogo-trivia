import { PLAYER_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER_LOGIN:
    return {
      ...state,
      name: action.payload,
      gravatarEmail: action.payload,
    };
  default:
    return state;
  }
};

export default player;

import { SHOW_NEXT } from '../actions';

const INITIAL_STATE = { next: false };

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SHOW_NEXT:
    return {
      ...state,
      next: action.payload,
    };
  default:
    return state;
  }
};

export default game;

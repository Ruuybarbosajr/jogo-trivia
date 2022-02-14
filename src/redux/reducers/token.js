import { TOKEN_REQUEST } from '../actions';

const INITIAL_STATE = '';

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN_REQUEST:
    return action.payload.token;

  default:
    return state;
  }
};

export default token;

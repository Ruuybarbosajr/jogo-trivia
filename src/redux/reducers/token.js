import { TOKEN_REQUEST } from '../actions'

const INITIAL_STATE = {
    token: '',
}

const token = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case TOKEN_REQUEST:
        return {
            token: action.payload,
        }
        
        default:
        return state;
    }
}

export default token;
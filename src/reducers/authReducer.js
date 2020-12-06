import { LOG_IN, TOKEN, INIT_PASS, LOG_OUT } from '../actions/types';

const initialState = {
  user: null,
  status: '',
  msg: '',
  active: 1,
  userData: {},
};

export default (state = initialState, action) => {
  // console.log(action.type)
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        user: action.user,
        active: action.active,
        token: action.token,
        msg: action.msg,
        status: action.status,
        userData: action.userData,
      };
    case LOG_OUT:
      return { ...state, user: action.user };
    case TOKEN:
      return { ...state, user: action.user, userData: action.userData };
    case INIT_PASS:
      return { ...state, msg: action.msg, status: action.status };
    default:
      return state;
  }
};

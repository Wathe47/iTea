import { AUTH, LOGOUT, DELETE_USER } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {

  switch (action.type) {
    case AUTH:
      return { ...state, authData: action?.data };

    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    case DELETE_USER:
      return state;
    default:
      return state;
  }
};

export default authReducer;

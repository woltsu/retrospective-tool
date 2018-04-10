import { login } from '../services/projectService';
const PROJECT_LOGIN_SUCCESSFUL = 'Project login successful';
const PROJECT_LOGIN_FAILURE = 'Project login failure';
const PROJECT_LOGOUT = 'Project logout';

const initialState = {
  project: null,
  errorMessage: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case PROJECT_LOGIN_SUCCESSFUL: {
    return {
      ...state,
      project: action.payload,
      errorMessage: ''        
    };
  }

  case PROJECT_LOGIN_FAILURE: {
    return {
      ...state,
      errorMessage: action.payload
    };
  }

  case PROJECT_LOGOUT: {
    return initialState;
  }

  default: {
    return state;
  }
  }
};

export const projectLogin = (credentials) => {
  return async (dispatch) => {
    const response = await login(credentials);
    if (response.error) {
      dispatch({
        type: PROJECT_LOGIN_FAILURE,
        payload: response.error
      });
    } else {
      const { token, name } = response.data;
      dispatch({
        type: PROJECT_LOGIN_SUCCESSFUL,
        payload: { token, name }
      });
    }
  };
};

export const projectLogout = () => {
  return { type: PROJECT_LOGOUT };
};

export default reducer;

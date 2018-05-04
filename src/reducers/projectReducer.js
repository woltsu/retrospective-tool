import projectService from '../services/projectService';
import commentService from '../services/commentService';
const PROJECT_LOGIN_SUCCESSFUL = 'Project login successful';
const PROJECT_LOGIN_FAILURE = 'Project login failure';
const PROJECT_LOGOUT = 'Project logout';
const SET_COMMENTS = 'Set comments';
const SET_FETCHING = 'Set fetching';
const ADD_COMMENT = 'Add comment';
const UPDATE_COMMENT = 'Update comment';

const initialState = {
  token: null,
  name: null,
  errorMessage: null,
  comments: [],
  fetching: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case PROJECT_LOGIN_SUCCESSFUL: {
    const { token, name } = action.payload;
    return {
      ...state,
      token,
      name,
      errorMessage: ''        
    };
  }
  
  case PROJECT_LOGIN_FAILURE: {
    return {
      ...state,
      errorMessage: action.payload
    };
  }

  case SET_COMMENTS: {
    return {
      ...state,
      comments: action.payload
    };
  }

  case SET_FETCHING: {
    return {
      ...state,
      fetching: action.payload
    };
  }

  case ADD_COMMENT: {
    return {
      ...state,
      comments: state.comments.concat(action.payload)
    };
  }

  case UPDATE_COMMENT: {
    const comment = action.payload;
    return {
      ...state,
      comments: state.comments.map((c) => c._id === comment._id ? comment : c)
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
    const response = await projectService.login(credentials);
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

export const setComments = (project) => {
  return async (dispatch) => {
    dispatch({
      type: SET_FETCHING,
      payload: true
    });
    const response = await projectService.getProject(project);
    const comments = response.comments;
    dispatch({
      type: SET_COMMENTS,
      payload: comments
    });
    dispatch({
      type: SET_FETCHING,
      payload: false
    });
  };
};

export const createComment = (comment, token) => {
  return async (dispatch) => {
    const response = await commentService.create(comment, token);
    dispatch({
      type: ADD_COMMENT,
      payload: response
    });
  };
};

export const toggleComment = (_id, important, token) => {
  return async (dispatch) => {
    const response = await commentService.put(_id, { important }, token);
    dispatch({
      type: UPDATE_COMMENT,
      payload: response
    });
  };
};

export default reducer;

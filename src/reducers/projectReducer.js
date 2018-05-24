import projectService from '../services/projectService';
import commentService from '../services/commentService';
import socketService from '../services/socketService';
const PROJECT_LOGIN = 'Project login';
const PROJECT_LOGIN_SUCCESSFUL = 'Project login successful';
const PROJECT_LOGIN_FAILURE = 'Project login failure';
const SET_SOCKET_USERNAME = 'Project set socket username';
const ADD_NEW_SOCKET_USER = 'Project add new socket user';
const REMOVE_SOCKET_USER = 'Project remove socket user';
const PROJECT_LOGOUT = 'Project logout';
const SET_COMMENTS = 'Project set comments';
const SET_FETCHING = 'Project set fetching';
const ADD_COMMENT = 'Project add comment';
const UPDATE_COMMENT = 'Project update comment';
const REMOVE_COMMENT = 'Project remove comment';

const initialState = {
  loginPending: false,
  usernamePending: false,
  socket_username: null,
  socketUsers: [],
  token: null,
  name: null,
  errorMessage: null,
  comments: [],
  fetching: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case PROJECT_LOGIN: {
    return {
      ...state,
      loginPending: true
    };
  }
    
  case PROJECT_LOGIN_SUCCESSFUL: {
    const { token, name } = action.payload;
    return {
      ...state,
      token,
      name,
      errorMessage: '',
      loginPending: false,
      usernamePending: true   
    };
  }

  case SET_SOCKET_USERNAME: {
    return {
      ...state,
      usernamePending: false,
      socket_username: action.payload
    };
  }

  case ADD_NEW_SOCKET_USER: {
    return {
      ...state,
      socketUsers: state.socketUsers.concat(action.payload)
    };
  }

  case REMOVE_SOCKET_USER: {
    return {
      ...state,
      socketUsers: state.socketUsers.filter((user) => user.id !== action.payload)
    };
  }
  
  case PROJECT_LOGIN_FAILURE: {
    return {
      ...state,
      errorMessage: action.payload,
      loginPending: false
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

  case REMOVE_COMMENT: {
    return {
      ...state,
      comments: state.comments.filter((c) => c._id !== action.payload)
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
    dispatch({
      type: PROJECT_LOGIN
    });
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

export const setProjectSocketUsername = (username) => {
  return {
    type: SET_SOCKET_USERNAME,
    payload: username
  };
};

export const addNewSocketUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: REMOVE_SOCKET_USER,
      payload: user.id
    });
    
    dispatch({
      type: ADD_NEW_SOCKET_USER,
      payload: user
    });
  };
};

export const removeSocketUser = (user) => {
  return {
    type: REMOVE_SOCKET_USER,
    payload: user
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
    socketService.emitAdd(response);
    dispatch({
      type: ADD_COMMENT,
      payload: response
    });
  };
};

export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    payload: comment
  };
};

export const updateComment = (comment) => {
  return {
    type: UPDATE_COMMENT,
    payload: comment
  };
};

export const toggleComment = (_id, important, token) => {
  return async (dispatch) => {
    const response = await commentService.put(_id, { important }, token);
    socketService.emitUpdate(response);
    dispatch({
      type: UPDATE_COMMENT,
      payload: response
    });
  };
};

export const removeComment = (_id, token) => {
  return async (dispatch) => {
    const response = await commentService.remove(_id, token);
    if (!response.error) {
      await socketService.emitRemove(_id);
      dispatch({
        type: REMOVE_COMMENT,
        payload: _id
      });
    }
  };
};

export const onlyRemoveComment = (_id) => {
  return {
    type: REMOVE_COMMENT,
    payload: _id
  };
};

export default reducer;

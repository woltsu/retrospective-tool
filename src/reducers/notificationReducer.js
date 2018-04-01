const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION';
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

const initialState = {
  notifications: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case CREATE_NOTIFICATION: {
    return {
      ...state,
      notifications: state.notifications.concat(action.payload)
    };
  }

  case REMOVE_NOTIFICATION: {
    return {
      ...state,
      notifications: state.notifications.slice(1)
    };
  }

  default: {
    return state;
  }
  }
};

export const createNotification = (notification, isError) => {
  return async (dispatch) => {
    const delay = 6;
    setTimeout(() => dispatch({
      type: REMOVE_NOTIFICATION
    }), delay * 1000);
    
    dispatch({
      type: CREATE_NOTIFICATION,
      payload: { message: notification, isError }
    });
  };
};

export default reducer;

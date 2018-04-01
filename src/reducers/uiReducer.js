const TOGGLE_DRAWER = 'Toggle drawer';
const TOGGLE_CREATE_FORM = 'Toggle create form';

const initialState = {
  drawerOpened: false,
  createFormOpened: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case TOGGLE_DRAWER: {
    return {
      ...state,
      drawerOpened: !state.drawerOpened
    };
  }

  case TOGGLE_CREATE_FORM: {
    return {
      ...state,
      createFormOpened: !state.createFormOpened
    };
  }
    
  default: {
    return state;
  }
  }
};

export const toggleDrawer = () => {
  return async (dispatch) => {
    dispatch({
      type: TOGGLE_DRAWER
    });
  };
};

export const toggleCreateForm = () => {
  return async (dispatch) => {
    dispatch({
      type: TOGGLE_CREATE_FORM
    });
  };
};

export default reducer;

const SET_SHOWING = 'Poker set showing';
const SET_PLAYERS_VOTE = 'Poker set players vote';
const UPDATE_OTHER_VOTES = 'Poker set other vote';
const CLEAR_OTHER_VOTES = 'Poker update other votes';
const UPDATE_PLAYERS_READY = 'Poker update players ready';
const CLEAR_PLAYERS_READY = 'Poker clear players ready';
const UPDATE_POKER_TITLE = 'Poker update poker title';
const SET_AVATAR_ID = 'Poker set avatar id';

const initialState = {
  playersVote: null,
  showing: false,
  otherVotes: {},
  playersReady: {},
  pokerTitle: '',
  avatarId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_SHOWING:
    return {
      ...state,
      showing: action.payload
    };

  case SET_PLAYERS_VOTE:
    return {
      ...state,
      playersVote: action.payload
    };
    
  case UPDATE_OTHER_VOTES: {
    const updatedVotes = { ...state.otherVotes };
    updatedVotes[action.payload.id] = action.payload.vote;
    return {
      ...state,
      otherVotes: updatedVotes
    };
  }

  case CLEAR_OTHER_VOTES:
    return {
      ...state,
      otherVotes: {}
    };
    
  case UPDATE_PLAYERS_READY: {
    const updatedPlayersReady = { ...state.playersReady };
    updatedPlayersReady[action.payload] = true;
    return {
      ...state,
      playersReady: updatedPlayersReady
    };
  }

  case CLEAR_PLAYERS_READY:
    return {
      ...state,
      playersReady: {}
    };
    
  case UPDATE_POKER_TITLE:
    return {
      ...state,
      pokerTitle: action.payload
    };

  case SET_AVATAR_ID:
    return {
      ...state,
      avatarId: action.payload
    };
    
  default: return state;
  }
};

export const setShowing = (value) => {
  return {
    type: SET_SHOWING,
    payload: value
  };
};

export const setPlayersVote = (value) => {
  return {
    type: SET_PLAYERS_VOTE,
    payload: value
  };
};

export const updateOtherVotes = (value) => {
  return {
    type: UPDATE_OTHER_VOTES,
    payload: value
  };
};

export const clearOtherVotes = () => {
  return {
    type: CLEAR_OTHER_VOTES
  };
};

export const updatePlayersReady = (id) => {
  return {
    type: UPDATE_PLAYERS_READY,
    payload: id
  };
};

export const clearPlayersReady = () => {
  return {
    type: CLEAR_PLAYERS_READY
  };
};

export const updatePokerTitle = (value) => {
  return {
    type: UPDATE_POKER_TITLE,
    payload: value
  };
};

export const setAvatarId = (id) => {
  return {
    type: SET_AVATAR_ID,
    payload: id
  };
};

export default reducer;

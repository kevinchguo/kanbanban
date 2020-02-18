import {
  USER_BOARDS,
  UPDATE_BOARD_TITLE,
  UPDATE_LIST_NAME,
  UPDATE_TASK_DESCRIPTION,
  ADD_NEW_BOARD
} from "../actions";

const initialState = {
  boards: {},
  userId: {},
  username: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_BOARDS:
      return Object.assign({}, state, {
        boards: action.payload,
        userId: action.payload.id,
        username: action.payload.username
      });
    case UPDATE_BOARD_TITLE:
      return Object.assign({}, state, { boards: action.payload });
    case UPDATE_LIST_NAME:
      return Object.assign({}, state, { boards: action.payload });
    case UPDATE_TASK_DESCRIPTION:
      return Object.assign({}, state, { boards: action.payload });
    case ADD_NEW_BOARD:
      return Object.assign({}, state, { boards: action.payload });
    default:
      return state;
  }
};

export default reducer;

import {
  USER_BOARDS,
  UPDATE_BOARD_TITLE,
  UPDATE_LIST_NAME,
  UPDATE_TASK_DESCRIPTION,
  ADD_NEW_BOARD,
  ADD_TASK,
  ADD_LIST
} from "../actions";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_BOARDS:
      return Object.assign(
        {},
        {
          user: action.payload,
          userId: action.payload.id,
          username: action.payload.username
        }
      );
    case UPDATE_BOARD_TITLE:
      return Object.assign({}, state, { user: action.payload });
    case UPDATE_LIST_NAME:
      return Object.assign({}, state, { user: action.payload });
    case ADD_TASK:
      return Object.assign({}, state, { user: action.payload });
    case ADD_LIST:
      return Object.assign({}, state, { user: action.payload });
    case UPDATE_TASK_DESCRIPTION:
      return Object.assign({}, state, { user: action.payload });
    case ADD_NEW_BOARD:
      return Object.assign({}, state, { user: action.payload });
    default:
      return state;
  }
};

export default reducer;

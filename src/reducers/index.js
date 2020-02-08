import { USER_BOARDS, CHANGE_BOARD } from "../actions";

const initialState = { boards: {}, currentBoard: 0 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_BOARDS:
      return Object.assign({}, state, { boards: action.payload });
    case CHANGE_BOARD:
      return Object.assign({}, state, { currentBoard: action.payload });
    default:
      return state;
  }
};

export default reducer;

import { USER_BOARDS } from "../actions";

const initialState = { boards: {} };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_BOARDS:
      return Object.assign({}, state, { boards: action.payload });
    default:
      return state;
  }
};

export default reducer;

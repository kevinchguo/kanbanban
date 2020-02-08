import Axios from "axios";

export const USER_BOARDS = "USER_BOARDS";
export const CHANGE_BOARD = "CHANGE_BOARDS";

export const loadUserBoards = () => async dispatch => {
  await Axios.get("/api/users")
    .then(data => {
      dispatch({
        type: USER_BOARDS,
        payload: data.data[0]
      });
    })
    .catch(err => {
      console.log(err.message);
    });
};

export const changeBoards = boardNum => async dispatch => {
  return dispatch({ type: CHANGE_BOARD, payload: boardNum });
};

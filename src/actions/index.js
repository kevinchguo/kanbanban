import Axios from "axios";

export const USER_BOARDS = "USER_BOARDS";
export const UPDATE_BOARD_TITLE = "UPDATE_BOARD_TITLE";
export const UPDATE_LIST_NAME = "UPDATE_LIST_NAME";
export const UPDATE_TASK_DESCRIPTION = "UPDATE_TASK_DESCRIPTION";

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

export const updateBoardTitle = data => async dispatch => {
  await Axios.put("/api/boards", data)
    .then(data => {
      dispatch({
        type: UPDATE_BOARD_TITLE,
        payload: data.data[0]
      });
    })
    .catch(err => {
      console.log(err.message);
    });
};

export const updateListName = data => async dispatch => {
  await Axios.put("/api/lists", data)
    .then(data => {
      dispatch({
        type: UPDATE_LIST_NAME,
        payload: data.data[0]
      });
    })
    .catch(err => {
      console.log(err.message);
    });
};

export const updateTaskDescription = data => async dispatch => {
  await Axios.put("/api/tasks", data)
    .then(data => {
      dispatch({
        type: UPDATE_TASK_DESCRIPTION,
        payload: data.data[0]
      });
    })
    .catch(err => {
      console.log(err.message);
    });
};

import Axios from "axios";

export const USER_BOARDS = "USER_BOARDS";
export const UPDATE_BOARD_TITLE = "UPDATE_BOARD_TITLE";
export const UPDATE_LIST_NAME = "UPDATE_LIST_NAME";
export const UPDATE_TASK_DESCRIPTION = "UPDATE_TASK_DESCRIPTION";
export const ADD_NEW_BOARD = "ADD_NEW_BOARD";
export const ADD_TASK = "ADD_TASK";
export const ADD_LIST = "ADD_LIST";
export const REORDER_TASKS = "REORDER_TASKS";

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

export const addNewBoard = data => async dispatch => {
  await Axios.post("/api/boards", data)
    .then(data => {
      dispatch({
        type: ADD_NEW_BOARD,
        payload: data.data[0]
      });
    })
    .catch(err => {
      console.log(err.message);
    });
};

export const addNewTask = data => async dispatch => {
  await Axios.post("/api/tasks", data)
    .then(data => {
      console.log("Data from adding task: ", data);
      dispatch({
        type: ADD_TASK,
        payload: data.data[0]
      });
    })
    .catch(err => {
      console.log(err.message);
    });
};

export const addNewList = data => async dispatch => {
  await Axios.post("/api/lists", data)
    .then(data => {
      console.log("Data from adding list: ", data);
      dispatch({
        type: ADD_LIST,
        payload: data.data[0]
      });
    })
    .catch(err => {
      console.log(err.message);
    });
};

export const reorderTasks = data => async dispatch => {
  await Axios.put("/api/tasks/reorder", data)
    .then(data => {
      dispatch({
        type: REORDER_TASKS,
        payload: data.data[0]
      });
    })
    .catch(err => {
      console.log(err.message);
    });
};

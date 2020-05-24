import axios from "axios";

const GET_DATE = "APP/DATE/GET_DATE";
const ADD_DATE = "APP/DATE/ADD_DATE";

const initialState = [new Date()];

const url = "https://test-task-codete.firebaseio.com";

const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATE:
      return [...state, ...action.payload];
    case ADD_DATE:
      return [...state, action.payload];
    default:
      return state;
  }
};

// actions

export const getDate = (date) => {
  return {
    type: GET_DATE,
    payload: date,
  };
};

export const addDate = (date) => {
  return {
    type: ADD_DATE,
    payload: date,
  };
};

//thunk

export const fetchDate = () => async (dispatch) => {
  let response = await axios.get(`${url}/date.json`);
  try {
    if (response.data) {
      let date = Object.values(response.data).map((d) => new Date(d));
      dispatch(getDate(date));
    } else {
      console.warn("Ще немає дат");
    }
  } catch (error) {
    console.error("Щось пішло не так", error);
  }
};
// post date to firebase database
export const addDataBase = (date) => async (dispatch) => {
  await axios.post(`${url}/date.json`, date);
  dispatch(addDate(date));
};

export default dateReducer;

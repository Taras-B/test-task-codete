import axios from "axios";

const initialState = [new Date()];

const url = process.env.REACT_APP_DB_URL;

const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATE":
      return [...state, ...action.payload];
    case "ADD_DATE":
      return [...state, action.payload];
    default:
      return state;
  }
};

// actions

export const getDate = (date) => {
  return {
    type: "GET_DATE",
    payload: date,
  };
};

export const addDate = (date) => {
  return {
    type: "ADD_DATE",
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
    console.warn("Щось пішло не так");
  }
};
// post date to firebase database
export const addDataBase = (date) => async (dispatch) => {
  await axios.post(`${url}/date.json`, date);
  dispatch(addDate(date));
};

export default dateReducer;

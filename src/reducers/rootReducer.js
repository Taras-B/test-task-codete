import { combineReducers } from "redux";
import dateReducer from "./date-reducer";

const rootReducer = combineReducers({ dateReducer });

export default rootReducer;

import { combineReducers } from "redux";
import { authReducer } from "../Authentication/reducer/authReducer";

export default combineReducers({
    authReducer,
});
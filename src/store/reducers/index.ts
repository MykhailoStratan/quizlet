import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
    login: loginReducer,
    // Add other reducers here
});

export default rootReducer;
import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./loginReducer";
import menuReducer from "./menuReducer";

const rootReducer = combineReducers({
    login: loginReducer,
    menu: menuReducer
});

export default rootReducer;
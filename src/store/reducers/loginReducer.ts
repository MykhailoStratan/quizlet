import { AnyAction, Reducer } from "@reduxjs/toolkit";

interface LoginState {
    isLogged: boolean;
}
  
const initialState: LoginState = {
    isLogged: false,
};

const loginReducer: Reducer<LoginState, AnyAction> = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGGED_IN':
            return {
                ...state,
                isLogged: true,
            };
        case 'SET_LOGGED_OUT':
            return {
                ...state,
                isLogged: false,
            };
        default:
            return state;
    }
};

export default loginReducer;
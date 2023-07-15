import { AnyAction, Reducer } from 'redux';

interface MenuState {
    options: string[];
}

const initialState: MenuState = {
    options: [], // Initial array, modify as needed
};

const menuReducer: Reducer<MenuState, AnyAction> = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DEFAULT_MENU':
            return {
                ...state,
                options: action.payload,
            };
        case 'SET_LOGIN_MENU':
            return {
                ...state,
                options: action.payload,
            };
        default:
            return state;
    }
};

export default menuReducer;
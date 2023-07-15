export const SET_DEFAULT_MENU = 'SET_DEFAULT_MENU';
export const SET_LOGIN_MENU = 'SET_LOGIN_MENU';

const defaultMenu = ['Home', 'Learn', 'User'];
const loginMenu = ['Home', 'Login'];

export const setDefaultMenu = () => {
    return {
        type: SET_DEFAULT_MENU,
        payload: defaultMenu
    };
};

export const setLoginMenu = () => {
    return {
        type: SET_LOGIN_MENU,
        payload: loginMenu
    };
};
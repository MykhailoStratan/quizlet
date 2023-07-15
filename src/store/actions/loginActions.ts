export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_LOGGED_OUT = 'SET_LOGGED_OUT';

export const setLoggedIn = () => {
    console.log('SET LOG IN to true')
    return {
        type: SET_LOGGED_IN,
    };
};

export const setLoggedOut = () => {
    return {
        type: SET_LOGGED_OUT,
    };
};

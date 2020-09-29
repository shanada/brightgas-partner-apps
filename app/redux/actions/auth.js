export const onSetLoggedIn = (isLoggedIn, userData) => {
    return {
        type: 'LOGIN',
        isLoggedIn,
        userData
    };
};
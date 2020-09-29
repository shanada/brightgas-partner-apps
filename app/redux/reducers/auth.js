const defaultState = {
    isLoggedIn: 3,
    accessToken: '4c8bc750ed29e67ccf717af29bd42b',
    userData: []
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {
                isLoggedIn: action.isLoggedIn,
                userData: action.userData
            })
        default:
            return state;
    }
} 
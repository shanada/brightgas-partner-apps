const defaultState = {
    //. State for loader
    isLoading: false,
    loaderMessage: 'Please wait'
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {

        case 'SETLOADER':
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                loaderMessage: action.loaderMessage
            });
        default:
            return state;
    }
}
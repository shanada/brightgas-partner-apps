const defaultState = {
    bannerHeight: 0
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {

        case 'SETHEIGHT':
            return Object.assign({}, state, {
                bannerHeight: action.bannerHeight,
            });
        default:
            return state;
    }
}
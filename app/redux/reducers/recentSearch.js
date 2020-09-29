const defaultState = {
    recentSearchData: []
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {

        case "ADD_RECENT": {
            let recentSearchData = cloneObject(state.recentSearchData)
            let indexOfData = recentSearchData.indexOf(action.recentSearchData)
            recentSearchData.length >= 10 ? recentSearchData.pop() : null
            if(indexOfData == -1){
                recentSearchData.unshift(action.recentSearchData)
            } else {
                recentSearchData.splice(indexOfData, 1)
                recentSearchData.unshift(action.recentSearchData)
            }
            state = Object.assign({}, state, {
                recentSearchData: recentSearchData
            });
            return state
        }
        case 'DELETE_ALL_RECENT':
            state = Object.assign({}, state, {
                recentSearchData: []
            });
            return state
        default:
            return state;
    }

    function cloneObject(object) {
        return JSON.parse(JSON.stringify(object));
    }
}
import AsyncStorage from '@react-native-community/async-storage'

export function addRecentSearch(recentSearchData) {
    AsyncStorage.getItem('recentSearch', (err, recentSearch) => {
        if (recentSearch !== null) {
            recentSearch = JSON.parse(recentSearch);
            let indexOfData = recentSearch.indexOf(recentSearchData)
            recentSearch.length >= 10 ? recentSearch.pop() : null
            if(indexOfData == -1){
                recentSearch.unshift(recentSearchData)
            } else {
                recentSearch.splice(indexOfData, 1)
                recentSearch.unshift(recentSearchData)
            }
            AsyncStorage.setItem('recentSearch', JSON.stringify(recentSearch))
        }
    });
    return {
        type: "ADD_RECENT",
        recentSearchData: recentSearchData
    };
}

export function deleteAllRecentSearch() {
    AsyncStorage.getItem('recentSearch', (err, recentSearch) => {
        if (recentSearch !== null) {
            AsyncStorage.setItem('recentSearch', []);
        }
    });
    return {
        type: "DELETE_ALL_RECENT",
    };
}

const initialState = {
    page: 1,
    achievement:null
}

export default function pageReducer(state = initialState, action) {
    switch(action.type) {
        case "Main": {
            return {...state, page:1, achievement: null}
        }
        case "Second": {
            return {...state, page:2, achievement: action.payload}
        } 
        case "Third": {
            return {...state, page:3,  achievement: action.payload}
        }
    }
    return state
}
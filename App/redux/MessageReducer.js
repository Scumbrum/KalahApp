let initialState = {
    open: false,
    status: "",
    content:""
}

export default function messageReducer(state = initialState, action) {
    switch(action.type) {
        case "Congratulation": {
            return {
                ...state,
                open: true,
                status: "Well done",
                content: `You get new ${action.level} level`
            }
        }

        case "Regress": {
            return {
                ...state,
                open: true,
                status: "Sorry",
                content: `You get down to ${action.level} level`
            }
        }

        case "MessageClose": {
            return {
                ...state,
                open: false,
                status: "",
                content: ""
            }
        }
    }

    return state
}
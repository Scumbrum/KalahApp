import { copyObjectArray } from "./additionals"

const initialState = {
    open: false,
    inputName: "",
    inputs: [],
    type: "saver"
}

export default function inputWindowReducer(state = initialState, action) {
    switch(action.type) {
        case "AddCategory": {
            return {
                ...state,
                open: true
            }
        }
        case "Cancel": {
            return {
                ...state,
                open: false,
                inputName:"",
                inputs: [],
                type: "saver"
            }
        }
        case "Input": {
            return {
                ...state,
                inputName: action.payload
            }
        }
        case "AddLevel": {
            return {
                ...state,
                open: true,
                inputName: action.name
            }
        }
        case "AddRequirement": {
            const newInputs = copyObjectArray(state.inputs)
            newInputs.push({name:"", value:""})
            return {
                ...state,
                inputs: newInputs
            }
        }
        case "DeleteRequirement": {
            let newInputs = copyObjectArray(state.inputs)
            newInputs.splice(action.index)
            return {
                ...state,
                inputs: newInputs
            }
        }

        case "InputNameRequire": {
            let newInputs = copyObjectArray(state.inputs)
            newInputs[action.index] = {name:action.requirement, value: newInputs[action.index].value}
            return {
                ...state,
                inputs: newInputs
            }
        }

        case "InputValueRequire": {
            let newInputs = copyObjectArray(state.inputs)
            newInputs[action.index] = {name:newInputs[action.index].name, value: action.value}
            return {
                ...state,
                inputs: newInputs
            }
        }
        case "EditLevel": {
            let newInputs = action.requirements
            return {
                ...state,
                open: true,
                inputs: newInputs,
                inputName: action.level,
                type: "Editor"
            }
        }
    }
    return state
}
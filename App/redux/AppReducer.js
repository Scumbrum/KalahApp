import { combineReducers } from "redux"
import pageReducer from "./PageReducer"
import achievementsReducer from "./AchievementsRecuder"
import inputWindowReducer from "./inputWindowReducer"
import messageReducer from "./MessageReducer"

export default combineReducers(
    {
        page: pageReducer,
        achievements: achievementsReducer,
        window: inputWindowReducer,
        message: messageReducer
    }
)

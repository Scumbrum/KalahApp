import React from "react";
import  ReactDOM  from "react-dom";
import {compose, createStore} from "redux"
import { Provider} from "react-redux";
import "../styles/site.less"
import appReducer from "../redux/AppReducer";
import SkillApp from "./SkillApp";
import URL from "./model/URL";
import {setFetchData} from "../redux/actions.js"

const store = createStore(appReducer, compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

fetch(URL).then(r =>r.text()).then(text => {
    let achievements = null
    if(text) {   
        achievements = JSON.parse(text)
    }
    store.dispatch(setFetchData(achievements))
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <SkillApp/>
            </Provider>
        </React.StrictMode>,
        document.querySelector(".skillApp"))
}).catch((e) => {
    ReactDOM.render(
        <React.StrictMode>
            <h1 className="error">Something way wrong</h1>
        </React.StrictMode>,
        document.querySelector(".skillApp"))
})
let currAchievements = null

store.subscribe(()=>{
    let achievements = store.getState().achievements
    if(!currAchievements) {
        currAchievements = achievements
        return
    }
    for(let field in achievements) {
        if(!currAchievements[field]) {
            sendData(achievements)
            currAchievements = achievements
            return
        }
        if(achievements[field].length !== currAchievements[field].length) {
            sendData(achievements)
            currAchievements = achievements
            return
        }
        for(let element = 0; element < achievements[field].length; element++) {
            for(let prop in achievements[field][element]) {
                if(achievements[field][element][prop] != currAchievements[field][element][prop]) {
                    sendData(achievements)
                    currAchievements = achievements
                    return
                }
            }
        }
    }
})


function sendData(data) {
    fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify(data)
    })
}

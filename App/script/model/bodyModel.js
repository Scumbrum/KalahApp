import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes, faPen} from '@fortawesome/free-solid-svg-icons'
import { copyObjectArray } from "../../redux/additionals.js"

export function leveler(handlers, achieve, progress, requirements, achievements) {
    let newReqiurements = requirements.filter(requirement => requirement.achievement === achieve)
    let newProgress = progress.filter(point => point.achievement === achieve)
    const levels = getLevels(newReqiurements)
    let currLevel = 0
    levels.forEach(level => {
        let suit = false
        for(let i = 0; i < level.requierements.length; i++) {
            for(let j = 0; j < newProgress.length; j++) {
                if(newProgress[j].name === level.requierements[i].name) {
                    if(newProgress[j].value >= level.requierements[i].value) {
                        suit=true
                    }
                    break
                }
            }
            if(!suit) {
                break
            }
        }
        if(suit) {
            currLevel = level.number
        }
    })
    handlers[0](currLevel, achieve)
    let prevLevel = achievements.find(achievement => achievement.name === achieve).level
    if(currLevel > prevLevel) {
        handlers[2](currLevel)
    } else if(currLevel < prevLevel) {
        handlers[1](currLevel)
    } else {
        alert("Same Level")
    }
}

export function getLevels(requirements) {
    const levels = []

    requirements.forEach(requierement => {
        let exist = levels.find(level => level.number === requierement.level)
        if(!exist) {
            levels.push({number:requierement.level, requierements:[{name:requierement.name, value:requierement.value}]})
        } else {
            exist.requierements.push({name:requierement.name, value:requierement.value})
        }
    });

    return levels
}

function getNextRequire(achievements, requirements, achievement) {
    let curr = achievements.find(other => other.name == achievement)
    if(!curr) {
        return []
    }
    return requirements.filter(requirement => requirement.achievement === achievement && requirement.level === curr.level + 1)
}

export function generateProgressInput(handler, achievements, requirements, progress, achievement) {
    let nextRequire = getNextRequire(achievements, requirements, achievement)
    const values = nextRequire.map(requirement => getValue(achievement, progress, requirement.name))
    return nextRequire.map((requirement, index) => <li key = {index}>{requirement.name}: <input type="number" value={values[index]} className="box_input" onChange = {(e) => inputHandler(e.target.value, requirement.name, achievement, handler)}/></li>)
}

function getValue(achievement, progress, name) {
    const suit = progress.find(element => element.name === name && element.achievement === achievement)
    if(!suit) {
        return 0
    }
    return suit.value
}

function  inputHandler(value, name, achievement, handler) {
    handler({value, name, achievement})
}

export function generateCurrentRequirements(achievements, requirements, achievement) {
    let nextRequire = getNextRequire(achievements, requirements, achievement)
    if(nextRequire.length === 0) {
        return <span>Next level is not specified</span>
    }
    return nextRequire.map((requirement, index) => <li key = {index}>{requirement.name} - {requirement.value}</li>)
}

export function createAchieveList(achievements, handler) {
    return achievements.map(
        (achievement, index) => achievementMapper(achievement.name, achievement.level, index, handler)
    )
}

function achievementMapper(name, level, index, handler) {
    return (
        <li className = "achieve" key = {index}>
            <h3 className="achieve_level">{level}</h3>
            <p className="achieve_name">{name}</p>
            <button className="achieve_inform" onClick={() => handler(name)}>More</button>
        </li>
    )
}

export function generateLevel(requirements, name, achievements, progress, handlers) {
    let newRequirements = requirements.filter((requirement) => requirement.achievement===name)
    const levels = getLevels(newRequirements)
    return levels.map((level, index) => <li key = {index}>
        <div className="level_head">
            <h3 className="level_title">Level {level.number}:</h3>
            {level.number > achievements.find(e => e.name === name).level ?
            <div className="level_controlls">
                <FontAwesomeIcon icon= {faPen} onClick={() => handlers[0](copyObjectArray(newRequirements.filter(requirement => requirement.level === level.number)), level.number)} className="level_edit"/>
                <FontAwesomeIcon icon= {faTimes} onClick={() => deleteHandler(handlers[1], level.number, requirements, name)} className="level_edit"/>
            </div>: null}
        </div>
        <div className="level_body">
            <ol>
                {level.requierements.map((requirement, index) => <li key={index}>{requirement.name} - {requirement.value}</li>)}
            </ol>
        </div>
    </li>)
}

function deleteHandler(deleter, level, requirements, name) {
    deleter(level, name)
    requirements = requirements.filter(requirement => !(requirement.achievement === name && requirement.level === level))
}

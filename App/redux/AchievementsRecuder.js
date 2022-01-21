import { copyObjectArray } from "./additionals"
const initialState = {
    achievements:[],
    requirements:[],
    progress:[]
}

export default function achievementsReducer(state = initialState, action) {
        let newAchievements = null
        let newRequirements = null
        switch(action.type) {
            case "FetchData": {
                if(action.achievements) {
                    return action.achievements
                }
                break;
            }
            case "SaveLevel": {
                newRequirements = addLevel(state.requirements, action.achievement, action.level, action.requirements)
                return {
                    ...state,
                    requirements:newRequirements
                }
            }
            case "DeleteLevel": {
                const param = deleteLevel(state.requirements, state.progress, action.level, action.achievement)
                return {
                    ...state,
                    requirements:param[0],
                    progress:param[1]
                }
            }
            case "SaveEditedLevel": {
                let param = editLevel(state.requirements, action.achievement, action.level, action.requirements, state.progress)
                return {
                    ...state,
                    requirements: param[0],
                    progress: param[1]
                }
            }
            case "SaveCategory": {
                newAchievements = addCategory(state.achievements, action.achievementName)
                break
            }
            case "DeleteCategory": {
                const param = deleteCategory(state.achievements, state.requirements, state.progress, action.achievementName)
                newAchievements = param[0]
                newRequirements = param[1]
                return {
                    ...state,
                    achievements:newAchievements,
                    requirements: newRequirements,
                    progress: param[2]
                }
            }
            case "MarkProgress": {
                newAchievements = markProgress(state.achievements, action.level, action.achievement)
                return {
                    ...state,
                    achievements:newAchievements,
                }
            }
            case "InputProgress": {
                const newProgress = inputProgress(state.progress, action.inputs)
                return {
                    ...state,
                    progress: newProgress
                }
            }
        }
        if(newAchievements) {
            return {
                ...state,
                achievements: newAchievements,
            }
        }
        return state
    }



function inputProgress(progress, inputs) {
    let newProgress = copyObjectArray(progress)
    newProgress = newProgress.filter(element => !(element.achievement === inputs.achievement && element.name ===inputs.name))
    newProgress.push(inputs)
    return newProgress
}

function markProgress(achievements, level, achievement) {
    let newAchievements = copyObjectArray(achievements)
    newAchievements =  newAchievements.map(element => {
        if(element.name === achievement) {
            return {...element, level}
        }
        return element
    })
    return newAchievements
}

function editLevel(requirements, achievement, level, newRequirements, progress) {
    let param = deleteLevel(requirements, progress, level, achievement, false)
    param[0] = addLevel(param[0], achievement, level, newRequirements)
    param[0] = sortLevels(param[0])
    return param
}

function deleteCategory(achievements, reqiurements, progress, name) {
    let newAchievements = copyObjectArray(achievements)
    let newReqiurements = copyObjectArray(reqiurements)
    let newProgress = copyObjectArray(progress)
    newReqiurements = newReqiurements.filter(reqiurement => reqiurement.achievement !== name)
    newAchievements = newAchievements.filter(achievement => achievement.name !== name)
    newProgress = newProgress.filter(point => point.achievement !== name)
    return [newAchievements, newReqiurements, newProgress]
}

function addLevel(requirements, achievement, level, newRequirements) {
    let result = copyObjectArray(requirements)
    newRequirements = newRequirements.map(reqiurement => {return {level: level, achievement:achievement, name:reqiurement.name, value: reqiurement.value}})
    result.push(...newRequirements)
    return result
}

function deleteLevel(requirements, progress, level, achievement, shuffle = true) {
    let newReqiurements = copyObjectArray(requirements)
    let newProgress = copyObjectArray(progress)
    newReqiurements = newReqiurements.filter(requirement => !(requirement.level === level && requirement.achievement === achievement))
    newProgress = newProgress.filter(point => point.achievement)
    if(shuffle) {
        newReqiurements = newReqiurements.map(requirement => requirement.level > level ? {...requirement, level: requirement.level-1} : requirement)  
    }
    return [newReqiurements, newProgress]
}

function addCategory(achievementList, name) {
    const exist = achievementList.map(
        (achievement) => achievement.name).includes(name
    )
    if(exist) {
        throw new Error("Exist achievement")
    }
    return [...copyObjectArray(achievementList), {name: name, level: 0}]
}

function sortLevels(requirements) {
    const levels = []
    requirements.forEach(element => {
        if(!levels.includes(element.level)){
            levels.push(element.level)
        }
    });
    levels.sort()
    const newReqiurements = []
    levels.forEach(level => {
        requirements.forEach((requirement) => {
            if(requirement.level===level) {
                newReqiurements.push(requirement)
            }
        })
    })
    return newReqiurements
}

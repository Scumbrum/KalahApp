export function toMain() {
    return {
        type: "Main"
    }
}
export function toSecond(name) {
    return {
        type: "Second",
        payload: name
    }
}
export function toThird(name) {
    return {
        type: "Third",
        payload: name
    }
}

export function addCategory() {
    return {
        type: "AddCategory",
    }
}

export function cancel() {
    return {
        type: "Cancel",
    }
}

export function inputName(name) {
    return {
        type: "Input",
        payload: name
    }
}

export function saveCategory(name) {
    return {
        type: "SaveCategory",
        achievementName: name
    }
}

export function getInform(name) {
    return {
        type: "GetInform",
        payload:name
    }
}

export function deleteCategory(name) {
    return {
        type: "DeleteCategory",
        achievementName: name
    }
}

export function addLevel(name) {
    return {
        type: "AddLevel",
        name
    }
}

export function addRequirement() {
    return {
        type: "AddRequirement"
    }
}

export function deleteRequirement(index) {
    return {
        type: "DeleteRequirement",
        index:index
    }
}

export function inputNameRequirement(index, name) {
    return {
        type: "InputNameRequire",
        index: index,
        requirement: name
    }
}

export function inputValueRequirement(index, value) {
    return {
        type: "InputValueRequire",
        index,
        value
    }
}

export function saveLevel(requirements, achievement, level) {
    return {
        type: "SaveLevel",
        requirements,
        achievement,
        level
    }
}

export function deleteLevel(level, achievement) {
    return {
        type: "DeleteLevel",
        level,
        achievement
    }
}

export function editLevel(requirements, level) {
    return {
        type: "EditLevel",
        level,
        requirements
    }
}

export function saveEditedLevel(requirements, achievement, level) {
    return {
        type: "SaveEditedLevel",
        requirements,
        achievement,
        level
    }
}

export function markProgress(level, achievement) {
    return {
        type: "MarkProgress",
        level,
        achievement
    }
}

export function inputProgress(inputs) {
    return {
        type: "InputProgress",
        inputs
    }
}

export function sendCongratulation(level) {
    return {
        type: "Congratulation",
        level
    }
}

export function sendRegress(level) {
    return {
        type: "Regress",
        level
    }
}

export function messageClose() {
    return {
        type: "MessageClose"
    }
}

export function setFetchData(achievements) {
    return {
        type: "FetchData",
        achievements
    }
}
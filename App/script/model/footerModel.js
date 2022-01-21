export function getNextLevel(requirements, achievement) {
    let suitable = requirements.filter(requirement => requirement.achievement === achievement)
    let currLevel = suitable.reduce((requirement1, requirement2) => maximazer(requirement1.level, requirement2.level), 0)
    return ++currLevel 
}

function maximazer(a, b) {
    if(b > a || !a) {
        return b
    }
    return a
}

export function deleteHandler(props) {
    props.toMain()
    props.deleteCategory(props.name)
}
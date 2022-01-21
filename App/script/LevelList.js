import { connect } from "react-redux"
import React from "react"
import { deleteLevel, editLevel, markProgress, sendCongratulation, sendRegress } from "../redux/actions"
import { generateLevel } from "./model/bodyModel"

function LevelList(props) {
    
    return (
        <>
            <h1 className="main_title">Levels list</h1>
            <ul className="level_list">
                {generateLevel(props.requirements, props.name, props.achievements, props.progress, [props.editLevel, props.deleteLevel, props.markProgress, props.sendRegress, props.sendCongratulation])}
            </ul>
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        requirements: state.achievements.requirements,
        name: state.page.achievement,
        progress: state.achievements.progress,
        achievements: state.achievements.achievements
    }
}

const mapDispatchToProps = {
    deleteLevel,
    editLevel,
    markProgress,
    sendCongratulation,
    sendRegress
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelList)
import { connect } from "react-redux"
import React from "react"
import { toThird, inputProgress, markProgress, sendCongratulation, sendRegress } from "../redux/actions"
import { leveler, generateCurrentRequirements, generateProgressInput } from "./model/bodyModel"

function AchieveBody(props) {
    return (
        <div className="box_container">
            <div className = "box_level">
                <h1 className="box_title">Levels</h1>
                <div className="box_body">
                    <h2 className="box_title2">Next level:</h2>
                    <div className="box_content">
                        <ol>
                            {generateCurrentRequirements(props.achievements, props.requirements, props.name)}
                        </ol>
                    </div>
                    <button className="level_button" onClick={e => props.toThird(props.name)}>Levels list</button>
                </div>
            </div>
            <div className = "box_progress">
                <h1 className="box_title">Progress</h1>
                <div className="box_content">
                    <ul>
                        {generateProgressInput(props.inputProgress, props.achievements, props.requirements, props.progress, props.name)}
                    </ul>
                </div>
                <button className="confirm_button" onClick={() => leveler([props.markProgress, props.sendRegress, props.sendCongratulation], props.name, props.progress, props.requirements, props.achievements)}>Change Level</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        achievements: state.achievements.achievements,
        requirements: state.achievements.requirements,
        name: state.page.achievement,
        progress: state.achievements.progress
    }
}

const mapDispatchToProps = {
    toThird,
    inputProgress,
    markProgress,
    sendCongratulation,
    sendRegress
}

export default connect(mapStateToProps, mapDispatchToProps)(AchieveBody)
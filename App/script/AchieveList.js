import { connect } from "react-redux"
import { toSecond } from "../redux/actions"
import React from "react"
import { createAchieveList } from "./model/bodyModel"

function AchieveList(props) {
    return (
        <ul className="achieve_list">
            {createAchieveList(props.achievements, props.toSecond)}
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        achievements: state.achievements.achievements,
    }
}

const mapDispatchToProps = {
    toSecond
}

export default connect(mapStateToProps, mapDispatchToProps)(AchieveList)
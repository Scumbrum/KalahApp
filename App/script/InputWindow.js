import { connect } from "react-redux"
import React from "react"
import { saveLevel, saveEditedLevel,inputValueRequirement ,cancel, inputName,saveCategory, addRequirement, deleteRequirement, inputNameRequirement } from "../redux/actions"
import { getHeader, generateInputs, saveLevelHandler, saveAchieveHandler } from "./model/popupsModel"

const InputWindow = (props) => {
    
    return (
        <div className = "input_window">
            <div className = "frame">
                <section className="frame_name">
                    {getHeader(props.page, props.name, props.inputName)}
                </section>
                {props.page===3 ? 
                    <section className = "frame_body">
                        <ul>
                            {generateInputs(props.inputs, [props.inputNameRequirement, props.inputValueRequirement, props.deleteRequirement])}
                        </ul>
                        <button className = "requirement_button" onClick={props.addRequirement}>Add requierement</button>
                    </section>:
                null}

            </div>
            <div className = "controlls">
                <button
                className="save_button"
                onClick={() => props.page === 1 ? saveAchieveHandler(props.saveCategory, props.name, props.cancel):
                props.type === "saver" ? saveLevelHandler(props.saveLevel, props.inputs, props.selected, props.requirements, parseInt(props.name), props.cancel):
                saveLevelHandler(props.editLevel, props.inputs, props.selected, props.requirements, parseInt(props.name), props.cancel)}>
                    Save
                </button>
                <button className="cancel_button" onClick={props.cancel}>Cancel</button>
            </div>
        </div>
        )
}

const mapStateToProps = (state) => {
    return {
        name: state.window.inputName,
        page: state.page.page,
        selected: state.page.achievement,
        requirements: state.achievements.requirements,
        inputs: state.window.inputs,
        type: state.window.type
    }
}

const mapDispatchToProps = {
    saveCategory,
    cancel,
    inputName,
    addRequirement,
    deleteRequirement,
    inputNameRequirement,
    inputValueRequirement, 
    saveLevel,
    editLevel: saveEditedLevel
}


export default connect(mapStateToProps, mapDispatchToProps)(InputWindow)
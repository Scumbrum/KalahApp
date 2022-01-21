import { connect } from "react-redux"
import React from "react"
import { addCategory, deleteCategory, toMain, addLevel} from "../redux/actions"
import { deleteHandler, getNextLevel } from "./model/footerModel"

const Footer = (props) => {
   
    return (
        <footer>
            
            {props.page === 1 ? <button className="add_button" onClick={props.addCategory}>Add achievement</button>:
            props.page ===2 ? <button className="delete_button" onClick={() => {deleteHandler(props)}}>Delete achievement</button>:
            <button className="add_level" onClick={e => props.addLevel(getNextLevel(props.requirements, props.name))}>Add level</button>}
        </footer>
        )
}

const mapStateToProps = (state) => {
    return {
        page: state.page.page,
        name: state.page.achievement,
        requirements: state.achievements.requirements
    }
}

const mapDispatchToProps = {
    addCategory,
    deleteCategory, 
    toMain,
    addLevel,
}


export default connect(mapStateToProps, mapDispatchToProps)(Footer)
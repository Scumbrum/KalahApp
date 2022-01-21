import { connect } from "react-redux"
import React from "react"
import { toMain, toSecond} from "../redux/actions"
import { generateLinks} from "./model/headerModel.js"

const NavLink = (props) => {
    const names = props.page === 2 ? ["Achieve List", props.name] :
    ["Achieve List", props.name, "Levels list"]
    return (
        <nav className="header_navbar">
            <ul className="navbar_list">
                {generateLinks(names, [props.toMain, props.toSecond.bind(null, props.name)])}
            </ul>
            <hr className="navbar_underline"></hr>
        </nav>
        )
}

const mapStateToProps = (state) => {
    return {
        name: state.page.achievement,
        page: state.page.page,
    }
}

const mapDispatchToProps = {
    toMain,
    toSecond
}


export default connect(mapStateToProps, mapDispatchToProps)(NavLink)
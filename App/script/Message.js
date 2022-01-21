import { messageClose } from "../redux/actions"
import { connect } from "react-redux"
import React from "react"

const Message = (props) => {
    
    return (
        <div className = "input_window">
            <div className = "frame">
                <section className="frame_name">
                    <span>{props.status}</span>
                </section>
                <section className = "frame_body">
                        <h3>{props.content}</h3>
                    </section>
            </div>
            <div className = "controlls">
                <button
                className="save_button"
                onClick={props.messageClose}>
                    Ok
                </button>
            </div>
        </div>
        )
}

const mapStateToProps = (state) => {
    return {
        status: state.message.status,
        content: state.message.content
    }
}

const mapDispatchToProps = {
    messageClose
}


export default connect(mapStateToProps, mapDispatchToProps)(Message)
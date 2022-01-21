import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import AchieveBody from "./AchieveBody";
import AchieveList from "./AchieveList";
import LevelList from "./LevelList";
import Footer from "./Footer";
import InputWindow from "./InputWindow";
import Message from "./Message";

function App(props) {
    return (
        <>
            <Header/>
            {props.open ? <InputWindow/> : null}
            {props.message ? <Message/>: null}
            <section className = "main_content">
                {
                    props.page === 1 ? <AchieveList/> :
                    props.page === 2 ? <AchieveBody/> :
                    <LevelList/>
                }
            </section>
            <Footer/>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        page: state.page.page,
        open: state.window.open,
        message: state.message.open
    }
}

export default connect(mapStateToProps, null)(App)
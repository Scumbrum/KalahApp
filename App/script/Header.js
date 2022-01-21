import { connect } from "react-redux"
import React, { useEffect, useRef, useState } from "react"
import NavLink from "./NavLink"
import { reducer } from "./model/headerModel"


const Header = (props) => {

    let [scroll, setScroll] = useState(0)
    const height = useRef()

    let [limit, setLimit] = useState(Infinity)

    if(height.current && !isFinite(limit)) {
        setLimit(height.current.offsetTop)
    }
     
    function setScrollh() {
        setScroll(window.scrollY); 
    }

    useEffect(() => {
       window.addEventListener("scroll", setScrollh)
       return () => window.removeEventListener("scroll", setScroll)
    }, [])

    return (
        <header className= "head">
            {props.page === 1 ? <h1 className = "greating">Hello, it is your SkillRate</h1> :
            <NavLink/>
            }
            {props.page === 1 ?
            <h2 className = {scroll < limit ? "counter" : "counter fixed"} ref = {height}>
                Score: {props.achievemets.reduce(reducer, 0)}
            </h2> : 
            <h2 className = "counter">
                Level: {props.achievemets.find((e) => e.name === props.name).level}
            </h2>}
        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        achievemets: state.achievements.achievements,
        page: state.page.page,
        name: state.page.achievement
    }
}

const mapDispatchToProps = {
    
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
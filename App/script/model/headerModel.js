import React from "react"

export function reducer(a, b) {
    if(!a.level) {
        return a + b.level
    }
    return a.level + b.level
}

export function generateLinks(names, handlers) {
    let links = []
    for(let i = 0; i < names.length; i++) {
        links.push(<li onClick={handlers[i]} key={i}>{names[i]}</li>)
        if(i !== names.length-1) {
            links.push(<span key={`sep${i}`} className="separator"><i></i></span>)
        }
    }
    return links
}
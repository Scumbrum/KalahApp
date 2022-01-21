import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

export function saveLevelHandler(saver, data, achievement, reqiurements, level, canceler) {
    const exist = []
    let valid = true
    for(let element of data){
        if(!element.value) {
            valid = false
            break
        }
    }
    let noSame = true
    data.forEach(element => {
        if(exist.includes(element.name)) {
            noSame = false
            return
        } else {
            exist.push(element.name)
        }
    });
    let greater = true
    for(let input of data) {
        let prev = reqiurements.find(reqiurement => reqiurement.achievement===achievement && reqiurement.level < level && reqiurement.name === input.name)
        if(!prev){
            continue
        }
        if(prev.value >= input.value) {
            alert("Low required level of " + input.name)
            greater = false
            break
        }
    }
    if(noSame && greater && valid) {
        saver(data, achievement, level)
        canceler()
    } else if (!noSame){
        alert("Same atributes name")
    } else if(!valid) {
        alert("Non valid values")
    }
}


export function generateInputs(inputs, handlers){
    return inputs.map((input, index) => 
    <li key = {index}>
        <input className = "frame_input-name" type = "text" value={input.name} onChange={(e) => handlers[0](index, e.target.value)}/>
        <input className = "frame_input-value" type = "number" value={input.value} onChange={(e) => handlers[1](index, parseInt(e.target.value))}/>
        <FontAwesomeIcon className="frame_delete" icon={faTimes} onClick={() => handlers[2](index)}/>
    </li>)
}

export function getHeader(page, name, handler) {
    return page===1 ? <><span>Name:</span>
    <input className = "frame_input" type="text" value={name} onChange={e=>handler(e.target.value)}/></>:
    <span>Level: {name}</span>
}

export function saveAchieveHandler(saver, name, closer) {
    try {
        saver(name)
    } catch(e) {
        alert(e)
    }
    closer()
}

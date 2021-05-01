import React from 'react'

console.log('loool')

const Quizoption = (props) => {
    return (
        <div className={`option ${props.selected===props.option?`selected`:``} ${props.chosen?`chosen`:``} ${props.correct?`correct`:``}`} onClick= {props.onOptionClick} id={props.id}>{props.option}</div>
    )
}

export default Quizoption

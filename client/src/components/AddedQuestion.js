import React from 'react'
import '../App.css'

const AddedQuestion = (props) => {
    return (
        <div className="addedQuestionWrapper">

            <div>
                {props.question.question}
                <button type="button" className="removeQuestionBtn" onClick={props.onRemoveClick} name={props.question.question}>X</button>
            </div>
            <div>
                Answer: {props.question.correct}
            </div>
            Options:
            <div>
            {
                    props.question.options.map((opt)=>
                            {
                                return <div>{opt}</div>
                            })
                                            
                        }
            </div>
        </div>
    )
}

export default AddedQuestion

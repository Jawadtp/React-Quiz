import React from 'react'

const Score = (props) => 
{
    const score = (((4 * props.correct - props.wrong)/(props.questionCount*4)) * 100).toFixed(2)

    return (
        <div className="scoreWrapper">
            <div className="scoreDisplay">
                Score<br/>
                <div className="scoreValue front">{score}%</div>
                
            </div>
            
            <div className="scoreStats">
                <div className="statBox">
                    Correct <div className="correctCount statValue">{props.correct}</div>
                </div>
                <div className="statBox">
                    Wrong <div className="wrongCount statValue">{props.wrong}</div>
                </div>
                <div className="statBox">
                    Questions <div className="questionCount statValue">{props.questionCount}</div>
                </div>
            </div>
        </div>
    )
}

export default Score

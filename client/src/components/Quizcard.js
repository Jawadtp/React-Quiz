import Quizoption from './Quizoption'

const Quizcard = (props) => {
    var id=1
    return (
        <div className={`quizcard center`}>
          <div className="timeleft"></div>
          <div className="headerWrapper">
            <div className={`title cardheader`}>Question {props.quest.id} out of {props.questionCount}</div>
            <div className={`headerbtns cardheader`}>
              {props.quest.id!==1?<div className={`prevBtn actionBtn`} onClick= {props.onPrevClick}>Previous</div>:''}
              {props.quest.id!==props.questionCount?<div className={`nextBtn actionBtn`} onClick= {props.onNextClick}>Next</div>:''}
            </div>
          </div>
          
          <div className="question">{props.quest.question}</div>

          <div className="options">
              {props.quest.options.map((option) => <Quizoption option={option} selected={props.selected} id={id++} onOptionClick={props.onOptionClick} />)}
          </div>

          <div className="submitBtns">
            <div className={`clearBtn actionBtn`} onClick= {props.onClearClick}>Clear</div>
            <div className={`submitBtn actionBtn`} onClick= {props.onSubmitClick}>Finish</div>
          </div>

        </div>

    )
}

export default Quizcard


/*
  var selected
    return (
        <div className={`quizcard center`}>
    <div className="title">Question {props.quest.id}</div>
    <br/>
    <div className="question">{props.quest.question}</div>

    <br/> 
    <div className="options">
        <Quizoption/>
        <div className={`option option1 ${props.selected===props.quest.option1?`selected`:``}`} onClick= {props.onOptionClick} id="1">{props.quest.option1}</div>
        <div className={`option option2 ${props.selected===props.quest.option2?`selected`:``}`} onClick= {props.onOptionClick} id="2">{props.quest.option2}</div>
        <div className={`option option3 ${props.selected===props.quest.option3?`selected`:``}`} onClick= {props.onOptionClick} id="3">{props.quest.option3}</div>
        <div className={`option option4 ${props.selected===props.quest.option4?`selected`:``}`} onClick= {props.onOptionClick} id="4">{props.quest.option4}</div>
    </div>

    <div className="submitBtns">
      <div className={`clearBtn actionBtn`} onClick= {props.onClearClick}>Clear</div>
      <div className={`submitBtn actionBtn`} onClick= {props.onSubmitClick}>Submit</div>
    </div>
  </div>
  */
import Quizoption from './Quizoption'

const QuizResponse = (props) => 
{
    return (
        <div className="responseQuestions">
            {props.response.map((resp)=> 
            
                   <div className={`quizcard response`}>
        
          <div className="headerWrapper">
            <div className={`title cardheader`}>Question {resp.id}</div>
         
          </div>
          
          <div className="responseStats">
              {resp.selected===''?`You did not attempt this question.`:`Your response was ${resp.correct===resp.selected?`correct`:`wrong`}`}
            </div>

          <div className="question">{resp.question}</div>

          <div className="options">
              {resp.options.map((option) => 
              
                  
              <Quizoption option={option} chosen={resp.selected==option?true:false} correct={resp.correct==option?true:false}/>
              
              )}
          </div>

        </div>

                
            
            )}
        </div>
    )
}

export default QuizResponse

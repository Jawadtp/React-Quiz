
const Quizresult = (props) => 
{
   const questionCount = props.response.length;
    var correct=0
    var wrong=0
    props.response.forEach(resp => 
    {
        if(resp.selected===resp.correct) correct++
        else if(resp.selected!=='') wrong++
    })
    return (
       <div className="center">
           <h1>Correct: {correct}</h1>
           <h1>Wrong: {wrong}</h1>
           <h1>Total questions: {questionCount}</h1>
       </div> 
    )
}

export default Quizresult

import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";
//import QuestionForm from "./QuestionForm";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((questions) => setQuestions(questions))
  }, [])

 // function handleQuestion(newQuestion) {
   // setQuestions([...questions, newQuestion])
  //}

  function handleDeleteQuestion(id) {
    //make a request to the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const remainingQuestions = questions.filter((query) => query.id !== id)
        setQuestions(remainingQuestions)
      })

  }



  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem  
            key={question.id} question={question}
            onDeleteQuestion={handleDeleteQuestion}
            
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;

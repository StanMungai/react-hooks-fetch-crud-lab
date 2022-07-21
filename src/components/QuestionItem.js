import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete() {
    onDeleteQuestion(id)
  }

  function handleChange() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({correctIndex}),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        const updatedQuestions = question.map((query) => {
          if (query.id === updatedQuestion.id){
            return updatedQuestion
          } else {
            return query
          }
        })
        onUpdateQuestion(updatedQuestions)
      })
    
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

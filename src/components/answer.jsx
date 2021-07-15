import React from "react";
import { quizzes } from "../data/quizzes";

const Answer = ({
  currentQuiz,
  currentQuestion,
  onSubmit,
  correctAnswer,
  clickedAnswer,
  answerOptions,
}) => {
  let answers = answerOptions.map((answerOption) => (
    <li
      className={
        clickedAnswer
          ? answerOption ===
            quizzes[currentQuiz].questions[currentQuestion].correctAnswer
            ? "correct"
            : correctAnswer === answerOption
            ? "correct"
            : clickedAnswer === answerOption
            ? "incorrect"
            : ""
          : ""
      }
      onClick={() => onSubmit(answerOption, currentQuestion)}
      key={answerOption}
    >
      {answerOption}
    </li>
  ));

  return (
    <>
      <ol type="A" disabled={clickedAnswer ? true : false} className="answer">
        {answers}
      </ol>
      <div>
        {correctAnswer ? "Correct!" : clickedAnswer ? "Incorrect..." : ""}
      </div>
    </>
  );
};

export default Answer;

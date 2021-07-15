import React from "react";

const Next = ({
  numTimes,
  count,
  currentQuiz,
  currentQuestion,
  clickedAnswer,
  onNext,
  currentQuizLength,
  numQuizzes,
}) => {
  return (
    <>
      <button
        className="next"
        disabled={
          clickedAnswer && currentQuizLength >= currentQuestion ? false : true
        }
        onClick={() =>
          onNext(
            numTimes,
            count,
            currentQuiz,
            currentQuestion,
            currentQuizLength,
            numQuizzes
          )
        }
      >
        Next
      </button>
    </>
  );
};

export default Next;

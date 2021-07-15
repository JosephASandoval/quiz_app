import React from "react";
import { getMessage } from "../data/messages";

const Complete = ({ numTimes, score, quizLength, onRetake }) => {
  return (
    <>
      <p>
        You got <span>{score}</span> out of <span>{quizLength}</span> questions
        right.
      </p>
      <h2>{getMessage()}</h2>
      <p>
        This was attempt number <span>{numTimes}</span>
      </p>
      <button onClick={onRetake} className="next">
        Retake
      </button>
    </>
  );
};

export default Complete;

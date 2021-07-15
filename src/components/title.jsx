import React from "react";

const Title = ({ title, count, quizLength }) => {
  return (
    <>
      <span>Question {count + 1}</span>/{quizLength}
      <h1>{title}</h1>
    </>
  );
};

export default Title;

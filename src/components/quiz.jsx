import React, { Component } from "react";
import Title from "./title";
import Question from "./question";
import Answer from "./answer";
import Next from "./next";
import Complete from "./complete";
import { quizzes } from "../data/quizzes";

class Quiz extends Component {
  state = {
    numTimes: 0,
    count: 0,
    currentQuiz: 0,
    currentQuestion: 0,
    quizOver: false,
    score: 0,
    correctAnswer: "",
    clickedAnswer: "",
    answerOptions: [],
  };

  componentDidMount() {
    const { answerOptions } = this.state;

    if (answerOptions.length === 0) {
      this.setState({
        answerOptions: this.createAnswerOptions(0, 0),
      });
    }
  }

  // Makes necessary state changes when the user choses and answer
  handleSubmit = (answerOption, currentQuestion) => {
    const { score, currentQuiz } = this.state;

    if (
      quizzes[currentQuiz].questions[currentQuestion].correctAnswer ===
      answerOption
    ) {
      this.setState({
        score: score + 1,
        correctAnswer: answerOption,
        clickedAnswer: answerOption,
      });
    } else {
      this.setState({
        score: score,
        correctAnswer: "",
        clickedAnswer: answerOption,
      });
    }
  };

  // Makes necessary state changes when the user clicks "Next"
  handleNext = (
    numTimes,
    count,
    currentQuiz,
    currentQuestion,
    currentQuizLength,
    numQuizzes
  ) => {
    const nextQuestion = currentQuestion + 1;
    const nextQuiz = currentQuiz + 1;

    if (nextQuestion < currentQuizLength) {
      this.setState({
        count: count + 1,
        currentQuiz: currentQuiz,
        currentQuestion: nextQuestion,
        correctAnswer: "",
        clickedAnswer: "",
        answerOptions: this.createAnswerOptions(currentQuiz, nextQuestion),
      });
    } else if (nextQuiz < numQuizzes) {
      this.setState({
        count: count + 1,
        currentQuiz: nextQuiz,
        currentQuestion: 0,
        correctAnswer: "",
        clickedAnswer: "",
        answerOptions: this.createAnswerOptions(nextQuiz, 0),
      });
    } else {
      this.setState({ numTimes: numTimes + 1, quizOver: true });
    }
  };

  // Resets the Quiz while maintaining "numTimes" user has taken the quiz
  handleRetake = () => {
    this.setState({
      count: 0,
      currentQuiz: 0,
      currentQuestion: 0,
      quizOver: false,
      score: 0,
      correctAnswer: "",
      clickedAnswer: "",
      answerOptions: this.createAnswerOptions(0, 0),
    });
  };

  // Creates an array of answers corresponding to the current quiz and question
  createAnswerOptions = (currentQuiz, currentQuestion) => {
    let answers = quizzes[currentQuiz].questions[
      currentQuestion
    ].incorrectAnswers.concat([
      quizzes[currentQuiz].questions[currentQuestion].correctAnswer,
    ]);
    return this.shuffle(answers);
  };

  // Fisher-Yates shuffle (helper function found online)
  shuffle = (array) => {
    let oldElement;
    for (let i = array.length - 1; i > 0; i--) {
      let rand = Math.floor(Math.random() * (i + 1));
      oldElement = array[i];
      array[i] = array[rand];
      array[rand] = oldElement;
    }
    return array;
  };

  render() {
    const {
      numTimes,
      count,
      currentQuiz,
      currentQuestion,
      quizOver,
      score,
      correctAnswer,
      clickedAnswer,
      answerOptions,
    } = this.state;

    let quizLength = 0;
    let numQuizzes = 0;
    quizzes.forEach((quiz) => {
      quizLength += quiz.questions.length;
      numQuizzes++;
    });

    let currentQuizLength = quizzes[currentQuiz].questions.length;

    return (
      <>
        {!quizOver ? (
          <div>
            <Title
              title={quizzes[currentQuiz].title}
              count={count}
              quizLength={quizLength}
            />
            <Question
              question={quizzes[currentQuiz].questions[currentQuestion].text}
            />
            <Answer
              currentQuiz={currentQuiz}
              currentQuestion={currentQuestion}
              onSubmit={this.handleSubmit}
              correctAnswer={correctAnswer}
              clickedAnswer={clickedAnswer}
              answerOptions={answerOptions}
            />
            <Next
              numTimes={numTimes}
              count={count}
              currentQuiz={currentQuiz}
              currentQuestion={currentQuestion}
              clickedAnswer={clickedAnswer}
              onNext={this.handleNext}
              currentQuizLength={currentQuizLength}
              numQuizzes={numQuizzes}
            />
          </div>
        ) : (
          <div className="complete">
            <Complete
              numTimes={numTimes}
              score={score}
              quizLength={quizLength}
              onRetake={this.handleRetake}
            />
          </div>
        )}
      </>
    );
  }
}

export default Quiz;

import React from "react";
import ReactDOM from "react-dom";
import Quiz from "./components/quiz";
import "./styles.css";

const App = () => {
  return (
    <div>
      <Quiz />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

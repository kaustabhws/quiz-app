import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CustomQuiz from "./Components/Quiz/CustomQuiz";
import { useState } from "react";
import Quiz from "./Components/Quiz/Quiz";

function App() {

  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [question, setQuestion] = useState('5')

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/select-quiz" element={<CustomQuiz setCategory={setCategory} setDifficulty={setDifficulty} setQuestion={setQuestion} />} />
          <Route exact path="/start-quiz/" element={<Quiz category={category} difficulty={difficulty} question={question} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

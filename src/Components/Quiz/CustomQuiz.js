import React from 'react'
import './Quiz.css'
import { useNavigate } from 'react-router-dom'

const CustomQuiz = ({ setCategory, setDifficulty, setQuestion }) => {

    const navigate = useNavigate()

    const handleClick = () => {
        const cat = document.getElementById('category').value
        const diff = document.getElementById('difficulty').value
        const ques = document.getElementById('question').value

        setCategory(cat)
        setDifficulty(diff)
        setQuestion(ques)

        navigate('/start-quiz/')
    }

    return (
        <div className="customQuizContainer">
            <div className="heading">
                <h2>QuizPro</h2>
            </div>
            <div className="customQuizHeading">
                <h2>Customize Your Quiz</h2>
            </div>
            <div className="selectionContainer">
                <h4>Select the following</h4>
                <div className="selCont">
                    <div className="category">
                        <label htmlFor="category">Category</label>
                        <select name="category" id="category">
                            <option value="any">Any Category</option>
                            <option value="linux">Linux</option>
                            <option value="bash">Bash</option>
                            <option value="uncategorized">Uncategorized</option>
                            <option value="docker">Docker</option>
                            <option value="sql">SQL</option>
                            <option value="cms">CMS</option>
                            <option value="code">Code</option>
                            <option value="devops">DevOps</option>
                        </select>
                    </div>
                    <div className="difficulty">
                        <label htmlFor="difficulty">Difficulty</label>
                        <select name="difficulty" id="difficulty">
                            <option value="any">Any Difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <div className="question">
                        <label htmlFor="question">Questions</label>
                        <select name="question" id="question">
                            <option value="10">10</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>
                <div className="submitBtn">
                    <button onClick={handleClick}>Start</button>
                </div>
            </div>
        </div>
    )
}

export default CustomQuiz;

import React, { useEffect, useState } from 'react';
import './Quiz.css';

const Quiz = ({ category, difficulty, question }) => {
    const api_key = process.env.REACT_APP_API_KEY;

    const [data, setData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const getQuestion = async () => {
        let url = `https://quizapi.io/api/v1/questions?apiKey=${api_key}&limit=${question}`;

        if (category !== null && category !== "any") {
            url += `&category=${category}`;
        }

        if (difficulty !== null && difficulty !== "any") {
            url += `&difficulty=${difficulty}`;
        }

        const response = await fetch(url);
        const res = await response.json();

        setData(res);
    };

    useEffect(() => {
        getQuestion();
    }, []);

    const nextQuestion = () => {
        if (!submitted && currentQuestion < data.length - 1) {
            checkSelectedAnswers(currentQuestion);
            setCurrentQuestion(currentQuestion + 1);
        } else if (!submitted) {
            alert("No more questions to display. Please submit your answers.");
        }
    };

    const checkSelectedAnswers = (questionIndex) => {
        const selectedAnswers = document.querySelectorAll('input[type="checkbox"]:checked');
        const correctAnswers = data[questionIndex].correct_answers;

        selectedAnswers.forEach((selected) => {
            const parentLabel = selected.parentElement;
            const key = parentLabel.getAttribute('data-key');

            if (correctAnswers[`${key}_correct`] === 'true') {
                setScore(score + 1);
            }
        });
    };

    const submitQuiz = () => {
        if (!submitted) {
            checkSelectedAnswers(currentQuestion);
            setSubmitted(true);
        }
    };

    const displayResult = () => {
        const percentage = (score / data.length) * 100;
        if (percentage > 30) {
            return (
                <div className="scoreCont">
                    <div className="scores">
                        <h1>Results: </h1>
                        <h3>You did great! 😄</h3>
                        <p>You scored {score} out of {question}</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="scoreCont">
                    <div className="scores">
                        <h1>Results: </h1>
                        <h3>You could've done better 😢</h3>
                        <p>You scored {score} out of {question}</p>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className='mainQuizContainer'>
            <div className="heading sp">
                <h2>QuizPro</h2>
            </div>
            {!submitted ?
                <div>
                    {currentQuestion < data.length && (
                        <>
                            <div className="questionCont">
                                <div className="questionsCont">
                                    <div className="quizTitle">
                                        <h2>{!category ? 'Any Category Quiz' : category}</h2>
                                    </div>
                                    <ul className='quizQuesContainer'>
                                        <li className='questionTitle'>{data[currentQuestion].question}</li>
                                        <ul className='optionContainer'>
                                            {Object.entries(data[currentQuestion].answers).map(([key, value]) => (
                                                value !== null && (
                                                    <label className="material-checkbox" key={key} data-key={key}>
                                                        <input type="checkbox" />
                                                        <span className="checkmark"></span>
                                                        <span className='vall'>{value}</span>
                                                    </label>
                                                )
                                            ))}
                                        </ul>
                                    </ul>
                                </div>
                            </div>
                            <div className="btnCont">
                                {currentQuestion < data.length - 1 ?
                                    <button className="btn-class-name" onClick={nextQuestion}>
                                        <span>Next</span>
                                        <svg viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z">
                                            </path>
                                        </svg>
                                    </button> :
                                    <button className="btn-class-name" onClick={submitQuiz}>
                                        <span>Submit</span>
                                        <svg viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z">
                                            </path>
                                        </svg>
                                    </button>}

                            </div>
                        </>
                    )}
                </div>
                :
                displayResult()
            }
        </div>
    );
};

export default Quiz;

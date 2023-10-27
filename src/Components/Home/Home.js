import React, { useState, useEffect } from 'react'
import Particle from './Particle';
import './Home.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const Home = () => {

    const [words, setWords] = useState(['Linux', 'Bash', 'Docker', 'SQL', 'CMS', 'Code', 'DevOps']);
    // eslint-disable-next-line
    const [colors, setColors] = useState(['tomato', 'rebeccapurple', 'lightblue']);
    // eslint-disable-next-line
    const [visible, setVisible] = useState(true);
    const [letterCount, setLetterCount] = useState(1);
    const [x, setX] = useState(1);
    const [waiting, setWaiting] = useState(false);

    useEffect(() => {
        const interval1 = setInterval(() => {
            if (letterCount === 0 && waiting === false) {
                setWaiting(true);
                setWords(prevWords => {
                    const usedWord = prevWords.shift();
                    prevWords.push(usedWord);
                    return [...prevWords];
                });
                setColors(prevColors => {
                    const usedColor = prevColors.shift();
                    prevColors.push(usedColor);
                    return [...prevColors];
                });
                setX(1);
                setLetterCount(prevLetterCount => prevLetterCount + x);
                setWaiting(false);
            } else if (letterCount === words[0].length + 1 && waiting === false) {
                setWaiting(true);
                setTimeout(() => {
                    setX(-1);
                    setLetterCount(prevLetterCount => prevLetterCount + x);
                    setWaiting(false);
                }, 500);
            } else if (waiting === false) {
                setLetterCount(prevLetterCount => prevLetterCount + x);
            }
        }, 80);

        const interval2 = setInterval(() => {
            setVisible(prevVisible => !prevVisible);
        }, 400);

        return () => {
            clearInterval(interval1);
            clearInterval(interval2);
        };
    }, [letterCount, waiting, words, x]);

    return (
        <div className="homeContainer">
            <Particle />
            <div className="heading">
                <h2>QuizPro</h2>
            </div>
            <div className="headerContainer">
                <div className="mainContainer">
                    <div className="headers">
                        <h2>The QuizPro includes a wide number of <span className='text-change'>{words[0].substring(0, letterCount)}</span> questions</h2>
                        <p>Test your knowledge now</p>
                    </div>
                    <div className="header-btn">
                        <Link to='/select-quiz'><button className='head-btn'>Take A Quiz</button></Link>
                    </div>
                </div>
                <div className="imgContainer">
                    <img src={logo} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Home;

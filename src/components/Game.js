import React, { useState, useEffect, useRef } from 'react'
import { words } from '../words';
import Form from './Form';

const Game = ({ user, supabase }) => {

  const typingArea = useRef(null);
  const startButton = useRef(null);

  const [inputText, setInputText] = useState("");
  const [typedText, setTypedText] = useState("");
  const [wordArray, setWordArray] = useState([]);
  const [, setWordsTyped] = useState(0);
  const [timer, setTimer] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [disableInput, setDisableInput] = useState(false)

  const reset = () => {
    setTypedText("");
    setTimerRunning(false);
    // const shuffledWords = words.sort(() => Math.random() - 0.5);
    const shuffledWords = words
      .map((w) => ({
        value: w,
        sort: Math.random()
      }))
      .sort((a, b) => a.sort - b.sort)
      .map((i) => i.value);
    setWordArray(shuffledWords);
    setDisableInput(false);
    setScore(0);
    setTimer(60);
    setWordsTyped(0);
    typingArea.current.disabled = false;
  };

  const endGame = () => {
    setTypedText((prev) => prev + inputText);
    calculateScore()
    setDisableInput(true);
    setInputText("");
    uploadScore()
  };

const uploadScore = async () => {
  if(!user.id) {
    console.log("no user!")
  }
  const { data, error } = await supabase
    .from('scores')
    .insert([
    { user_id: user.id, score: score },
    ])
  }

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const calculateScore = () => setScore(typedText.length / 5)

  useEffect(() => {
    if (timer > 0 && timerRunning) {
      calculateScore()
      setTimeout(() => {
        setTimer((time) => time - 1);
      }, 1000);
    } else if (!timer) {
      endGame();
    }
  }, [timer, timerRunning]);

  useEffect(() => {
    if (inputText.length === 1 && !timerRunning) {
      setTimerRunning(true);
    }
    if (inputText === `${wordArray[0]} `) {
      setTypedText((prev) => prev + inputText);
      setWordsTyped((wordsTyped) => wordsTyped + 1);
      setWordArray((prevArray) => prevArray.filter((w, i) => i > 0));
    }
  }, [inputText]);

  useEffect(() => {setInputText("")}, [wordArray]);

  useEffect(() => {setDisableInput(false)}, []);

    return (        
      <div>
        <div className="max-w-sm mx-auto px-5 my-6">
          <Form 
            inputText={inputText}
            handleChange={handleChange}
            typingArea={typingArea}
            disableInput={disableInput}
            handleSubmit={reset}
            placeholder="Type here"
            icon
          />
          <div className="truncate text-white text-xl text-center">{wordArray.length > 0 ? <p>{wordArray.join(" ")}</p> : <p>.....</p>}</div>  
          <div className="text-white text-center mt-5 font-title text-6xl"><p>{`${timer}`}</p></div>
          <div className="text-white text-center font my-4"><p><span className="font-body">Score: </span>{`${score}`}</p></div>
        </div>
      </div>
    )
}

export default Game

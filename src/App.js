import { useState, useEffect } from "react";
import Question from "./components/Question";

export default function App() {
	const [start, setStart] = useState(false);
	const [score, setScore] = useState(0);
	const [quizData, setQuizData] = useState([
		{
			question: "",
			correctAnswer: "",
			incorrectAnswers: [""],
      options:[],
      answered: false
		},
	]);

	useEffect(() => {
		fetch("https://opentdb.com/api.php?amount=5&difficulty=easy")
			.then((res) => res.json())
			.then((data) =>
				setQuizData(
					data.results.map((que) => {
						return {
							question: que.question,
							correctAnswer: que.correct_answer,
							incorrectAnswers: que.incorrect_answers,
							options: [...que.incorrect_answers, que.correct_answer]
								.map((value) => ({
									value,
									sort: Math.random(),
								}))
								.sort((a, b) => a.sort - b.sort)
								.map(({ value }) => value),
              answered: false
						}
					})
				)
			);
	}, [start]);

	const questionEls = quizData.map((question, index) => {
		const q = question.question;
		return (
			<Question
				key={index + 1}
				index={index}
				question={q}
				options={question.options}
				handleClick={answer}
        answered={question.answered}
			/>
		);
	});

	function startGame() {
		setStart((prevState) => !prevState)
    setScore(0)
	}

	function answer(event, qNo, op) {

		setQuizData(prevState => {
      const newData = prevState.map((que, index) => {
        if(qNo === index && op === que.correctAnswer){
          event.target.style.backgroundColor='#94D7A2'
          setScore((prevScore) => prevScore < 5 ? prevScore + 1 : prevScore)
          return {
            ...que,
            answered: true
          }
        }
        else if(qNo === index && op !== que.correctAnswer){
          event.target.style.backgroundColor='#F8BCBC'
          return {...que, answered: true}
        }
        else{
          return {...que}
        }
      });

      return newData
    })

    // console.log(event.target.option);
    // console.log(quizData)
	}

	return (
		<div className="app">
			<img className="blob-right" src="../assets/blob-right.svg" alt="" />
			<img className="blob-left" src="../assets/blob-left.svg" alt="" />
			{!start ? (
				<main className="start">
					<h1>Quizzical</h1>
					<p>{`{placeholder description}`}</p>
					<button className="start-button" onClick={startGame}>
						Start Quiz
					</button>
				</main>
			) : (
				<div>
					<main className="quiz">{questionEls}</main>
					<footer className="footer">
						<h2 className="score">
							You scored {score}/5 correct answers
						</h2>
						<button className="restart-button" onClick={startGame}>
							Play again
						</button>
					</footer>
				</div>
			)}
		</div>
	);
}

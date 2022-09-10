import { useState, useEffect } from "react";
import Question from "./components/Question";

export default function App() {
	const [start, setStart] = useState(false);
	const [quizData, setQuizData] = useState([
		{
			question: "",
			correct_answer: "",
			incorrect_answers: [""],
		},
	]);

	useEffect(() => {
		fetch("https://opentdb.com/api.php?amount=5&difficulty=easy")
			.then((res) => res.json())
			.then((data) => setQuizData(data.results));
	}, []);

	// console.log(quizData[0])
	// const que = quizData[0]
	const questionEls = quizData.map((question, index) => {
		const q = question.question;
		const options = [...question.incorrect_answers, question.correct_answer]
			.map((value) => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value);

		return (
			<Question
				key={index + 1}
				question={q}
				options={options}
				correctAnswer={question.correct_answer}
			/>
		);
	});
	// console.log(questionEls);

	function startGame() {
		setStart(prevState => !prevState);
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
          <h2 className="score">You scored 5/5 correct answers</h2>
          <button className="restart-button" onClick={startGame}>
						Play again
					</button>
          </footer>
				</div>
			)}
		</div>
	);
}

import { useState, useEffect } from "react";
import Question from "./components/Question";

export default function App() {
	const [start, setStart] = useState(true);
	// const [quizData, setQuizData] = useState({});

	useEffect(() => {
		fetch("https://opentdb.com/api.php?amount=10&difficulty=easy")
			.then((res) => res.json())
			.then((data) => console.log(data));
	}, []);

	function startGame() {
		setStart(true);
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
				<main className="quiz">
          <Question />
        </main>
			)}
		</div>
	);
}

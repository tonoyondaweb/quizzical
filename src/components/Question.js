export default function Question(props) {
	const optionEls = props.options.map((option, index) => {
		const optionNumber = index + 1;
		const color = {
			backgroundColor:
				option === props.correctAnswer ? "#94D7A2" : "transparent",
			border: option === props.correctAnswer ? "none" : "1px solid #4D5B9E",
		};
		return (
			<p
				className="option"
				key={optionNumber}
				option={optionNumber - 1}
				style={color}
			>
				{option}
			</p>
		);
	});

	return (
		<div className="question">
			<h2>{props.question}</h2>
			<div className="options">{optionEls}</div>
			<hr className="divider" />
		</div>
	);
}

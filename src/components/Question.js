export default function Question(props) {
	const optionEls = props.options.map((option, index) => {
		const optionNumber = index;
		return (
			<p
				className="option"
				key={optionNumber}
				option={optionNumber}
                onClick={
                    !props.answered ?
                    (event) => props.handleClick(event, props.index, option) :
                    (event) =>  ''
                }
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

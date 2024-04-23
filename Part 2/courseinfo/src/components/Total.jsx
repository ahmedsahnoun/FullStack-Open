const Total = ({ parts }) => {
	const Total = parts.reduce((acc, cur) => acc + cur.exercises, 0)
	return (
		<p>
			<b>total of {Total} exercises</b>
		</p>
	)
}

export default Total
import Part from "./Part"

const Content = ({ parts }) => {
	return (
		<div>
			{parts.map(({ name, exercises, id }) =>
				<Part key={id} name={name} exercises={exercises} />
			)}
		</div>
	)
}

export default Content
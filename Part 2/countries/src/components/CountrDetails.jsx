const CountryDetails = ({ details, weather }) => {
	if (details)
		return (
			<>
				<h2>{details.name.common}</h2>
				<div>capital {details.capital[0]}</div>
				<div>area {details.area}</div>
				<h4>languages:</h4>
				<ul>
					{Object.values(details.languages).map((language, index) =>
						<li key={language + index}>{language}</li>
					)}
				</ul>
				<img src={details.flags.png} />
			</>
		);
}

export default CountryDetails;
const CountryList = ({ countries, setCurrentCountry }) => {
	return (
		<>
			{countries.map((country, index) =>
				<div key={index}>
					{country}
					<button onClick={() => setCurrentCountry(country)}>show</button>
				</div>)}
		</>
	);
}

export default CountryList;
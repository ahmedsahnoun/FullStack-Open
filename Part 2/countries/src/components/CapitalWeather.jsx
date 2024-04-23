const CapitalWeather = ({ weather }) => {
	if (weather)
		return (
			<>
				<h3>Weather in {weather.name}</h3>
				<div>
					temperature {weather.main.temp} Celcius
				</div>
				<div>
					<img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
				</div>
				<div>
					wind {weather.wind.speed} m/s
				</div>
			</>
		);
}

export default CapitalWeather;
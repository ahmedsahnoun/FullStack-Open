import { useState } from "react";
import { useEffect } from "react";
import countryService from "../services/countryService";

const CapitalWeather = ({ capital }) => {
	const [weather, setWeather] = useState(null)

	useEffect(() => {
		const apiKey = import.meta.env.VITE_WEATHER_KEY
		if (apiKey)
			countryService
				.getWeather(capital, apiKey)
				.then(data => setWeather(data))
				.catch(() => setWeather(null))
	}, [capital])

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
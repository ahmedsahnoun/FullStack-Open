import axios from 'axios'

const getAllCountries = () => {
	return axios
		.get("https://studies.cs.helsinki.fi/restcountries/api/all")
		.then(response => response.data)

}

const getCountry = (country) => {
	return axios
		.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
		.then(response => response.data)
}

const getWeather = (country, apiKey) => {
	return axios
		.get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}&units=metric`)
		.then(response => response.data)
}

export default {
	getAllCountries,
	getCountry,
	getWeather
}
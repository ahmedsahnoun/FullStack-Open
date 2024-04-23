import { useState, useEffect } from "react"
import countryService from "./services/countryService"
import CountryList from "./components/CountryList"
import CountryDetails from "./components/CountrDetails"
import CapitalWeather from "./components/CapitalWeather"

const App = () => {
  const [apiKey, setApiKey] = useState(null)
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [search, setSearch] = useState('')
  const [currentCountry, setCurrentCountry] = useState('')
  const [currentCountryDetails, setCurrentCountryDetails] = useState(null)
  const [currentCountryWeather, setCurrentCountryWeather] = useState(null)

  const handleSearch = (e) => {
    const newSearch = e.target.value
    setSearch(newSearch)
  }

  useEffect(() => {
    setApiKey(import.meta.env.VITE_WEATHER_KEY)
    countryService
      .getAllCountries()
      .then(data => {
        const countryNames = data.map(country => country.name.common)
        setAllCountries(countryNames)
      })
  }
    , [])

  useEffect(() => {
    const newFilteredCountries = allCountries.filter(country => country.toUpperCase().includes(search.toUpperCase()))
    setFilteredCountries(newFilteredCountries)
    if (newFilteredCountries.length === 1) {
      setCurrentCountry(newFilteredCountries[0])
    }
    else {
      setCurrentCountry('')
    }
  }, [search])

  useEffect(() => {
    if (currentCountry)
      countryService
        .getCountry(currentCountry)
        .then((data) => setCurrentCountryDetails(data))
        .catch(() => setCurrentCountryDetails(null))
  }
    , [currentCountry])

  useEffect(() => {
    if (apiKey)
      countryService
        .getWeather(currentCountryDetails.capital[0], apiKey)
        .then(data => setCurrentCountryWeather(data))
        .catch(() => setCurrentCountryWeather(null))
  }, [currentCountryDetails])


  return (
    <>
      <div>
        find countries
        <input value={search} onChange={handleSearch} />
      </div>

      {(filteredCountries.length <= 10) ?
        (filteredCountries.length > 1) ?
          <CountryList
            setCurrentCountry={setCurrentCountry}
            countries={filteredCountries}
          ></CountryList>
          : <></>
        : <div>too many matches, specify another filter</div>
      }

      {currentCountry ?
        <>
          <CountryDetails
            details={currentCountryDetails}
          ></CountryDetails>
          <CapitalWeather
            weather={currentCountryWeather}
          ></CapitalWeather>
        </>
        : <></>
      }

    </>
  )
}

export default App
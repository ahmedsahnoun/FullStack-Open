import { useState, useEffect } from "react"
import countryService from "./services/countryService"
import CountryList from "./components/CountryList"
import CountryDetails from "./components/CountryDetails"
import CapitalWeather from "./components/CapitalWeather"

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [search, setSearch] = useState('')
  const [currentCountry, setCurrentCountry] = useState('')
  const [currentCountryDetails, setCurrentCountryDetails] = useState(null)

  const filteredCountries = allCountries.filter(country => country.toUpperCase().includes(search.toUpperCase()))

  const handleSearch = (e) => {
    const newSearch = e.target.value
    setSearch(newSearch)
  }

  useEffect(() => {
    countryService
      .getAllCountries()
      .then(data => {
        const countryNames = data.map(country => country.name.common)
        setAllCountries(countryNames)
      })
  }
    , [])

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setCurrentCountry(filteredCountries[0])
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

      {currentCountry && currentCountryDetails ?
        <>
          <CountryDetails
            details={currentCountryDetails}
          ></CountryDetails>
          <CapitalWeather
            capital={currentCountryDetails.capital[0]}
          ></CapitalWeather>
        </>
        : <></>
      }

    </>
  )
}

export default App
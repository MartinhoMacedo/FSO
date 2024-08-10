import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const ListCountries = ({countries, searched, setSearched}) => {
  if( countries === null ) return null

  const filteredCountries = countries.
        filter(country => country.name.common.toLowerCase().includes(searched.toLowerCase()))

  // each country printed should be a different component
  const printCountriesNames = () => filteredCountries.map(country =>
    <div> {country.name.common} </div>
  )

  return (
    <div>
      {filteredCountries.length > 10 ?
       "Too many matches, specify another filter" : printCountriesNames()}
    </div>
  )
}

const Search = ({setCountry, searched, setSearched}) => {

  const handleSearchChange = (event) => {
    setSearched(event.target.value)
  }

  return (
    <div>
      find countries <input
                       value={searched}
                       onChange={handleSearchChange}
                     />

    </div>
  )
}

function App() {
  const [country, setCountry] = useState(null)
  const [countries, setCountries] = useState(null)
  const [searched, setSearched] = useState("")

  useEffect(()=>{
    countriesService.getAll().then(newCountries => {
      console.log(`getting all countries data`)
      setCountries(newCountries)
    })
  },[])

  return (
    <div>
      <Search
        setCountry = {setCountry}
        searched={searched}
        setSearched={setSearched}
      />
      <ListCountries
        countries = {countries}
        searched = {searched}
        setSearched = {setSearched}
      />
    </div>
  )
}

export default App

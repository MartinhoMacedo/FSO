import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import Country from './components/Country'

const CountryName = ({name}) => <div> {name} </div>

const ListCountries = ({countries, searched, setSearched}) => {
  if( countries === null ) return null

  const filteredCountries = countries.
        filter(country => country.name.common.toLowerCase().includes(searched.toLowerCase()))

  const printCountriesNames = () => filteredCountries.map(country =>
    <CountryName name={country.name.common} key={country.name.official}/>
  )

  if(filteredCountries.length > 10){
    return <div> Too many mataches, specify another filter </div>
  } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return <div> {printCountriesNames()} </div>
  } else if (filteredCountries.length === 1){
    console.log("Found the country:" ,filteredCountries[0])
    return <Country country={filteredCountries[0]}/>
  } else return null
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

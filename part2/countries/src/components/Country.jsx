import {useState, useEffect} from 'react'
import weatherService from '../services/weather'

const Header = ({name}) => (<h1> {name} </h1>)

const Information = ({country}) =>
      <div>
        <div> capital {country.capital} </div>
        <div> area {country.area} </div>
      </div>

const Language = ({language}) => <li> {language} </li>

const Languages = ({country}) =>
      <div>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map(language => <Language
                                                              key={language}
                                                              language={language}/>
                                               )}
        </ul>
      </div>

const Flag = ({country}) => <div> <img src={country.flags.png} ></img> </div>

const Weather = ({weather, capital}) =>{
  if(weather === null) return null
  console.log("loading icon:", weather.weather[0].icon)
  return(
  <div>
    <h2>Weather in {capital}</h2>
    <div>temperature {weather.main.temp} Celcius </div>
    {console.log(weatherService.getIcon(weather.weather[0].icon))}
    <div> <img src={weatherService.getIcon(weather.weather[0].icon)}></img> </div>
    <div>wind {weather.wind.speed} m/s </div>
  </div>)
}
const Country = ({country}) => {
  const [weather, setWeather] = useState(null)

  useEffect(()=>{
    weatherService.getWeather(country.capital).then(weather => {
      console.log("getting weather")
      setWeather(weather)
    })
  },[])

  return <div>
    <Header name={country.name.common}/>
    <Information country={country}/>
    <Languages country={country}/>
    <Flag country={country}/>
    <Weather weather={weather} capital={country.capital}/>
  </div>
}
export default Country

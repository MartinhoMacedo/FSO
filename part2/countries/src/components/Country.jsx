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

const Country = ({country}) =>
      <div>
        <Header name={country.name.common}/>
        <Information country={country}/>
        <Languages country={country}/>
        <Flag country={country}/>
      </div>

export default Country

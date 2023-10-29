import { useEffect, useState } from "react"
import axios from 'axios';

const Filter = ({filterTextOnChange, filterTextValue}) =>{
  return (
    <>
    <label htmlFor="country">
      find countries&nbsp;
    </label>
    <input 
      type="text" 
      name="country" 
      id="country" 
      value={filterTextValue} 
      onChange={filterTextOnChange} />      
    </>    
  )
}

const CountryList = ({countries, setCountriesFiltered}) => {
  if (!countries){
    return
  }
  if (countries.length > 10){
    return <p>Too many matches, specify another filter</p>
  }
  if (countries.length > 1){
    return (
      <>
        {countries.map(x => { return (
          <p key={x.name.common} id={x.name.common}>
            {x.name.common}&nbsp;
            <button type="button" id={x.name.common} onClick={ () => setCountriesFiltered([x]) } >show</button>
          </p>
        )
        })}
      </>
    )
  }
  if (countries.length == 1){
    return <Country item={countries[0]} />
  }  
}

const Country = ({item}) => {
  console.log('Country', item)
  const [weather, setWeather] = useState([])
  let change = ''
  useEffect( ()=> {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${item.capital[0]}&appid=${import.meta.env.VITE_WEATHER_API}&units=metric`    
    axios.get(url)
      .then( x => {setWeather(x.data)})
      .catch(() => {setWeather({})})
  }, [change])
  change = 'c'
  console.log('weather', weather)
  return (
    <>
      <h3>{item.name.common}</h3>
      <p key='p1'>
            capital&nbsp;{item.capital[0]} <br></br>
            area&nbsp;{item.area}
          </p>
          <h4>languages</h4>
          <ul>
            {Object.keys(item.languages).map( (key, index) => {
              return (
                <li key={index}>                  
                    {item.languages[key]}      
                </li>
              );
            }
            )}
          </ul>          
          <img src={item.flags.svg} alt={item.name.common} width='20%' />
          {
            weather && weather.main && weather.main.temp && ( <div>
              <h3>Weather in {item.capital[0]}</h3>
              <p>temperature {weather.main.temp} Celsius</p>
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
              <p>wind {weather.wind.speed} m/s</p>
              </div>
            )
          }          
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  useEffect(()=>{
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(x => {
      setCountries(x.data)
    } )
    .catch( () => {alert('Error')})
  }, [])

  const [countriesFiltered, setCountriesFiltered] = useState([])

  const [filterText, setFilterText] = useState('')
  const filterTextOnChange = (e) => {
    setFilterText(e.target.value)
  }
  useEffect( () => {
    setCountriesFiltered(countries.filter(c => c.name.common.toLowerCase().indexOf(filterText.toLowerCase()) !== -1))
  }, [filterText]
  )
  
  return (
    <>
      <Filter filterTextValue={filterText} filterTextOnChange={filterTextOnChange} />
      <CountryList countries={countriesFiltered} setCountriesFiltered={setCountriesFiltered} />
    </>  
    
    //https://fullstackopen.com/en/part2/adding_styles_to_react_app
  )
}

export default App

/*
const medelete = {
    "coord": {
        "lon": -0.13,
        "lat": 51.51
    },
    "weather": [
        {
            "id": 300,
            "main": "Drizzle",
            "description": "light intensity drizzle",
            "icon": "09d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 280.32,
        "pressure": 1012,
        "humidity": 81,
        "temp_min": 279.15,
        "temp_max": 281.15
    },
    "visibility": 10000,
    "wind": {
        "speed": 4.1,
        "deg": 80
    },
    "clouds": {
        "all": 90
    },
    "dt": 1485789600,
    "sys": {
        "type": 1,
        "id": 5091,
        "message": 0.0103,
        "country": "GB",
        "sunrise": 1485762037,
        "sunset": 1485794875
    },
    "id": 2643743,
    "name": "London",
    "cod": 200
}
*/
import { useEffect, useState } from "react"
import axios from 'axios';

const Filter = (props) =>{
  return (
    <>
    <label htmlFor="country">find countries&nbsp;</label>
    <input type="text" name="country" id="country" onChange={props.filterTextChange} />      
    </>
    
  )
}

const CoutriesList = (props) => {
  //props.setCapital('')
  if (props.filterText[0] === ''){
    return
  }
  
  const countries = props.filterText[1] === '0' ?
      props.countries.filter(x => x.name.common.toLowerCase().indexOf(props.filterText[0].toLowerCase()) !== -1)
    :
      props.countries.filter(x => x.name.common.toLowerCase() === props.filterText[0].toLowerCase())

  if (countries.length > 10){
    return <p>Too many matches, specify another filter</p>
  }
  if (countries.length > 1){
    return (
      <>      
        {countries.map(x => { return (          
          <p key={x.name.common} id={x.name.common}>
            {x.name.common}
            &nbsp; 
            <button type="button" onClick={props.showCountry} id={x.name.common}>show</button>
          </p>
        )        
        })}      
      </>
    )
  }
  if (countries.length == 1){
    const country = countries[0]
    props.setCapital(country.capital[0])    
    return (
      <>
      <h3>{country.name.common}</h3>
      <p key='p1'>
            capital&nbsp;{country.capital.map(x => x).join(' ')} <br></br>
            area&nbsp;{country.area}
          </p>
          <h4>languages</h4>
          <ul>
            {Object.keys(country.languages).map( (key, index) => {
              return (
                <li key={index}>                  
                    {country.languages[key]}      
                </li>
              );
            }
            )}
          </ul>          
          <img src={country.flags.svg} alt={country.name.common} width='20%' />
      </>      
    )
  } else {
    props.setCapital('')
    return
  }
  
}

const CapitalWeather = (props) => {
  console.log('capital', props.capital)
  if (!props.capital || props.capital.length === 0){
    return
  }
  
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${props.capital}&appid=${import.meta.env.VITE_WEATHER_API}`
  axios.get(url)
    .then(x=> {      
      return (
        <>
        <h3>Weather in {props.capital}</h3>
        <p>temperature {x.data.main.temp} fahreheinght</p>
        <img src={`https://openweathermap.org/img/wn/${x.data.weather[0].icon}@2x.png`}/>
        <p>wind {x.data.wind.speed} m/s</p>
        </>
      )
    })
    .catch(x=>console.error('ERROR', x))
  
}

const App = () => {
  const [countries, setCountries] = useState([])
  const getCountries = ()=>{
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(x => {
      setCountries(x.data)      
    } )
    .catch( () => {alert('Error')})
  }
  
  useEffect(getCountries, [])

  const [filterText, setFilterText] = useState(['', '0'])
  const filterTextChange = (event) => {
    setFilterText([event.target.value,'0'])
  }
 
  const showCountry = (event)=>{    
    setFilterText([event.target.id,'1'])
  }

  const [capital, setCapital] = useState('')

  return (
    <div>
      <Filter filterTextChange={filterTextChange} filterText={filterText} />
      <CoutriesList countries={countries} filterText={filterText} showCountry={showCountry} setCapital={setCapital} />
      <CapitalWeather capital={capital} />
    </div>  
    
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
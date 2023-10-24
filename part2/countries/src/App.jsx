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
  if (!props.filterText){
    return
  }
  //TODO IF EXACT X.NAME == FILTERTEXT
  const countries = props.countries
    .filter(x => x.name.common.toLowerCase().indexOf(props.filterText.toLowerCase()) !== -1)
    

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
            <button type="button" onClick={props.showCountry} key={x.name.common} id={x.name.common}>show</button>
          </p>
        )        
        })}      
      </>
    )
  }
  if (countries.length == 1){    
    return (
      <>
      { countries.map(x => {        
        return (
          <>
          <h3>{x.name.common}</h3>
          <p>
            capital&nbsp;{x.capital.map(x => x).join(' ')} <br></br>
            area&nbsp;{x.area}            
          </p>
          <h4>languages</h4>
          <ul>
            {Object.keys(x.languages).map( (key, index) => {
              return (
                <li key={index}>                  
                    {x.languages[key]}      
                </li>
              );
            }
            )}
          </ul>          
          <img src={x.flags.svg} alt={x.name.common} width='20%' />
          </>
        )
      }) }
      </>
      
    )
  }
  
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
  const config = []
  useEffect(getCountries, config)

  const [filterText, setFilterText] = useState('')
  const filterTextChange = (event) => {
    setFilterText(event.target.value)
  }

 
  const showCountry = (event)=>{
    console.log(event.target.id)
    setFilterText(event.target.id)
  }

  return (
    <div>
      <Filter filterTextChange={filterTextChange} filterText={filterText} />
      <CoutriesList countries={countries} filterText={filterText} showCountry={showCountry}/>
    </div>  
    
    //https://fullstackopen.com/en/part2/adding_styles_to_react_app
  )
}

export default App
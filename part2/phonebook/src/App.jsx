import { useState, useEffect } from 'react'
import connect from './services/connect'

const Filter = (props) => {
  return (
    <div>
        filter shown with <input id='filterIn' type="text" onChange={props.filterTextChange} />
    </div>
  )  
}

const PersonForm = (props) => {
  return (
  <>
    <form id='form1' onSubmit={props.submit}>
    <div>
      <label htmlFor="nameIn">name:</label>       
      <input id='nameIn' name='nameIn' value={props.newName} onChange={props.newNameOnChange}/>
    </div>
    <div>
      <label htmlFor="numberIn">number:</label>
      <input id='numberIn' name='numberIn' value={props.newNumber} onChange={props.newNumberOnChange} />
    </div>
    <div>
      <button type="submit" id='addSub' name='addSub'>add</button>
    </div>
    </form>
  </>
  )
}

const Persons = (props) => {
  return props.persons
        .filter( x => x.name.toLowerCase().indexOf(props.filterText.toLowerCase()) !== -1 )
        .map( item => <p key={item.id}>{item.name} {item.number}</p> )
}

const App = () => {  
  const [persons, setPersons] = useState([]);
  
  const getPersons = () => {
    connect.getAll().then( (resp) => {setPersons(resp.data);} );
  }
  const config = []
  useEffect(getPersons, config);

  const [newName, setNewName] = useState('')
  const newNameOnChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const [newNumber, setNewNumber] = useState('')
  const newNumberOnChange = (event) => {
    setNewNumber(event.target.value)
  }

  const [filterText, setFilterText] = useState('')
  const filterTextChange = (event) => {
    setFilterText(event.target.value)    
  }

  const addPerson = (event) =>{
    event.preventDefault()
    console.log('Button clicked:', event.target)
    let arr = [...persons]
    let addToNameArr = true

    if (newName === '' || newNumber === ''){
      return
    }

    arr.forEach(x=>{
      if(x.name.toLowerCase() === newName.toLowerCase()){
        addToNameArr = false
        window.alert(`${newName} is already added to phonebook`)
        return
      } 
    })
    if (addToNameArr){
      const it = {name:newName, number:newNumber}      
      connect.newPerson(it).then( (resp) => {
        arr.push(it);
        setPersons(arr);
        setNewName('');
        setNewNumber('');
      });      
    }
  }

  return (
    <div>      
      <h2>Phonebook</h2>
      <Filter filterTextChange={filterTextChange}/>      
      <h3>Add a new</h3>
      <PersonForm 
        submit={addPerson} 
        newName={newName} newNameOnChange={newNameOnChange} 
        newNumber={newNumber} newNumberOnChange={newNumberOnChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filterText={filterText} />      
    </div>
  )
}

export default App
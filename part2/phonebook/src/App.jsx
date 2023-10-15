import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('A new name...')
  const newNameOnChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addPerson = (event) =>{
    event.preventDefault()
    console.log('Button clicked:', event.target)
    let arr = [...persons]
    arr.push({name:newName})
    setPersons(arr);
  }

  return (
    <div>      
      <h2>Phonebook</h2>
      <form id='form1' onSubmit={addPerson}>
        <div>
          name: <input id='nameIn' name='nameIn' value={newName} onChange={newNameOnChange}/>
        </div>
        <div>
          <button type="submit" id='addSub' name='addSub'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map( item =>{
          return (
            <p>{item.name}</p>
          )
        })
      }
    </div>
  )
}

export default App
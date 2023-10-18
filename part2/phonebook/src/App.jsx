import { useState } from 'react'


const App = () => {
  const [personsKey, setPersonsKey] = useState(4);
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  
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
    arr.forEach(x=>{
      if(x.name.toLowerCase() === newName.toLowerCase()){
        addToNameArr = false
        window.alert(`${newName} is already added to phonebook`)
        return
      } 
    })
    if (addToNameArr){
      const newPersonKey = personsKey + 1;
      arr.push({name:newName, number:newNumber, id:newPersonKey})
      setNewName('')
      setNewNumber('')
      setPersonsKey(newPersonKey)
    }      

    setPersons(arr);    
  }

  return (
    <div>      
      <h2>Phonebook</h2>
      <div>
        filter shown with <input id='filterIn' type="text" onChange={filterTextChange} />
      </div>
      <h2>add a new</h2>      
      <form id='form1' onSubmit={addPerson}>
        <div>
          name: <input id='nameIn' name='nameIn' value={newName} onChange={newNameOnChange}/>
        </div>
        <div>
          number: <input id='numberIn' name='numberIn' value={newNumber} onChange={newNumberOnChange} />
        </div>
        <div>
          <button type="submit" id='addSub' name='addSub'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons
        .filter(x => x.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1)
        .map( item =>{
          return (
            <p key={item.id}>{item.name} {item.number}</p>
          )
        })
      }
    </div>
  )
}

export default App
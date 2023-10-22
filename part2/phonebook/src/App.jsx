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
  const persons = props.persons
        .filter( x => x.name.toLowerCase().indexOf(props.filterText.toLowerCase()) !== -1 )
        .map( item => {
          return (
            <li key={item.id+'li'} id={item.id+'li'} className='no-bullets'>
              {item.name} {item.number} &nbsp;
              <button type="submit" 
                key={item.id} 
                id={item.id} 
                name={item.name}
                onClick={props.delPerson}>
                  delete
              </button>
            </li>
          )
        }  );
  return (
    <>
    <form action='submit' id='personsFormID'>
      <ul className='no-bullets'>
      {persons}
      </ul>
    </form>
    </>
    );
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
    //console.log(event.target.value)
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

  const delPerson = (event) => {
    event.preventDefault();
    let arr = [...persons]

    if (window.confirm(`Delete ${event.target.name}?`)){
      connect.delPerson(event.target.id)
        .then(() => {
          arr = arr.filter(it => {            
            return it.id != event.target.id
          });          
          setPersons(arr);
        })
        .catch(() => window.alert('Operation failed!'));
    }
    
  }

  const addPerson = (event) =>{
    event.preventDefault();    
    let arr = [...persons];    
    let states = ['NAME_NOT_EXISTS', 'NAME_EXISTS', 'DIFFERENT_PHONE'];
    let state = states[0];
    let id = 0;

    if (newName === '' || newNumber === ''){
      return
    }

    arr.forEach(x=>{
      if(x.name.toLowerCase() === newName.toLowerCase()){
        if (x.number === newNumber) {
          state = states[1];
          window.alert(`${newName} is already added to phonebook`);
          return
        } else {
          if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
            state = states[2];
            id = x.id;
          }          
          return
        }
      } 
    })
    if (state === states[0]){
      const it = {name:newName, number:newNumber};
      connect.newPerson(it).then( (resp) => {        
        arr.push(resp.data);
        setPersons(arr);
        setNewName('');
        setNewNumber('');
      });
    } else if (state === states[2]){
      const it = {name:newName, number:newNumber};
      connect.updatePersonPhone(id, it).then( (resp) => {
        arr = arr.filter(x => x.id != id);
        arr.push(resp.data);
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
      <Persons persons={persons} filterText={filterText} delPerson={delPerson} />      
    </div>
  )
}

export default App
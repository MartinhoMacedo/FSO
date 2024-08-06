import { useState, useEffect } from 'react'
import personsService from './services/persons'

const DeleteButton = ({id, setPersons, persons}) => {
  const deleteClick = () => {
    personsService.deleteEntry(id).then(
      removedPerson => {
        setPersons(
          persons.toSpliced(persons.findIndex(person => person.id === removedPerson.id), 1)
        )
      }
    )
  }

  return <button onClick={deleteClick}>Delete</button>
}

const Person = ({person, persons, setPersons}) =>
      <div>
        {person.name} {person.number} <DeleteButton
                                        id={person.id} setPersons={setPersons} persons={persons}
                                      />
      </div>

const Persons = ({persons, newSearch, setPersons}) =>{
  const tempPersons = newSearch === '' ? persons :
        persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
  return <div>
           {tempPersons.map(person =>
             <Person person={person} setPersons={setPersons} persons={persons} key={person.name}/>
           )}
        </div>
}

const Filter = ({newSearch, setNewSearch}) => {

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  return(
    <div>
      filter shown with
      <input
        value={newSearch}
        onChange={handleSearchChange}
      />
    </div>
  )
}

const PersonForm = ({newName, newNumber, setNewName, setNewNumber}) => {
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange= (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <div>
      name: <input
              value={newName}
              onChange={handleNameChange}
            />
      </div>
      <div>
      number: <input
              value={newNumber}
              onChange={handleNumberChange}
            />
      </div>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect( () => {
    console.log('effect')
    personsService.getAll()
      .then(allPersons => {
        console.log('promise fulfilled')
        setPersons(allPersons)
      })

  },[])

  const nameNotUsed = (name) => persons.every((person) =>{
    return person.name != name
  })

  const addName = (event) => {
    event.preventDefault()
    const personObject = {name: newName,
                          number: newNumber
                         }
    if(nameNotUsed(newName)){
      personsService.create(personObject).then(
        newPersons => {
          setPersons(persons.concat(newPersons))
          setNewName('')
          setNewNumber('')
        }
      )
      return
    }
    alert(`${newName} is already added to phonebook`)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} setNewSearch={setNewSearch}/>
      <form onSubmit={addName}>
      <h3>Add a new</h3>
        <PersonForm
          newName={newName}
          newNumber={newNumber}
          setNewName={setNewName}
          setNewNumber={setNewNumber}
        />
        <div> <button type="submit">add</button> </div>
      </form>
      <h3>Numbers</h3>
      <Persons persons={persons} newSearch={newSearch} setPersons={setPersons}/>
    </div>
  )
}

export default App

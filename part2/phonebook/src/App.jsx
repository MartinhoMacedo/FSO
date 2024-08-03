import { useState } from 'react'

const Person = ({person}) => <div> {person.name} {person.number} </div>

const Persons = ({persons, newSearch}) =>{
  const tempPersons = newSearch === '' ? persons :
        persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
  return <div> {tempPersons.map(person => <Person person={person} key={person.name}/>)} </div>
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const nameNotUsed = (name) => persons.every((person) =>{
    return person.name != name
  })

  const addName = (event) => {
    event.preventDefault()
    const personObject = {name: newName,
                          number: newNumber
                         }

    if(nameNotUsed(newName)){
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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
      <Persons persons={persons} newSearch={newSearch}/>
    </div>
  )
}

export default App

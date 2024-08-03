import { useState } from 'react'

const Person = ({person}) => <div> {person.name} {person.number} </div>

const Persons = ({persons}) =>(
  <div> {persons.map(person => <Person person={person} key={person.name}/>)} </div>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-123456'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange= (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
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
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
  )
}

export default App

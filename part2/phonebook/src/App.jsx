import { useState } from 'react'

const Person = ({person}) => <div> {person.name} </div>

const Persons = ({persons}) =>(
  <div> {persons.map(person => <Person person={person} key={person.name}/>)} </div>
)


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const nameNotUsed = (name) => persons.every((person) =>{
    return person.name != name
  })

  const addName = (event) => {
    event.preventDefault()
    const personObject = {name: newName}

    if(nameNotUsed(newName)){
      setPersons(persons.concat(personObject))
      setNewName('')
      return
    }
    alert(`${newName} is already added to phonebook`)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
                  value={newName}
                  onChange={handleNameChange}
                />
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

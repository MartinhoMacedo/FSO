import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}> {text} </button>

const Display = ({text}) => <div> {text} </div>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const getRandomInt = (max) => { return Math.floor(Math.random() * max)}

  const randomAnecdote = () => {setSelected(getRandomInt(anecdotes.length))}

  const mostVotedIdx= () => {
    let idx = 0
    for (let i=0; i<anecdotes.length; i++){
      if(points[i] > points[idx]){
        idx = i
      }
    }
    return idx

  }

  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }


  let mvIdx = mostVotedIdx()

  return (
    <div>
      <h1> Anecdote of the day </h1>
      <Display text={anecdotes[selected]}/>
      <Display text={"has " + points[selected] + " votes"}/>
      <Button handleClick={vote} text="vote"/>
      <Button handleClick={randomAnecdote} text="next anecdote"/>
      <h1> Anecdote with most votes</h1>
      <Display text={anecdotes[mvIdx]}/>
      <Display text={"has " + points[mvIdx] + " votes"}/>
    </div>
  )
}

export default App

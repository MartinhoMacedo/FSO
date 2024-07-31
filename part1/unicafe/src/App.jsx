import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({text, value}) => <div> {text} {value} </div>

const Statistics = ({good, neutral, bad}) => {
  const total =  good + bad + neutral
  const average = (good - bad)/total
  const positive = good/total
  return (
    <div>
      <h1>statistics</h1>
      <Display text="Good" value={good}/>
      <Display text="Neutral" value={neutral}/>
      <Display text="Bad" value={bad}/>
      <Display text = "all" value={total}/>
      <Display text = "average" value={average}/>
      <Display text = "positive" value={positive*100 + "%"}/>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={() => setGood(good+1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral"/>
      <Button handleClick={() => setBad(bad+1)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App

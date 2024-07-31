import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const total =  good + bad + neutral
  const average = (good - bad)/total
  const positive = good/total
  if (total == 0) return <div> No feedback given </div>

  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text="Good" value={good}/>
          <StatisticsLine text="Neutral" value={neutral}/>
          <StatisticsLine text="Bad" value={bad}/>
          <StatisticsLine text = "all" value={total}/>
          <StatisticsLine text = "average" value={average}/>
          <StatisticsLine text = "positive" value={positive*100 + "%"}/>
        </tbody>
      </table>
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
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App

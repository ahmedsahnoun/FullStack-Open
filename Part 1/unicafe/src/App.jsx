import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td> {text} </td>
      <td> {value} {text === "positive" ? "%" : ""} </td>
    </tr>
  )
}

const Statistics = ({ values, all }) => {
  if (all === 0)
    return (
      <div>No feedback given</div>
    )
  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={values.good}></StatisticLine>
        <StatisticLine text={"neutral"} value={values.neutral}></StatisticLine>
        <StatisticLine text={"bad"} value={values.bad}></StatisticLine>
        <StatisticLine text={"all"} value={values.all}></StatisticLine>
        <StatisticLine text={"average"} value={values.average}></StatisticLine>
        <StatisticLine text={"positive"} value={values.positive}></StatisticLine>
      </tbody>
    </table>
  )
}

const Title = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({ text, valueSetter }) => {
  return (
    <button onClick={valueSetter}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const updater = (type) => {
    const newValues = { good, neutral, bad, all }
    const valueSetters = {
      good: setGood,
      neutral: setNeutral,
      bad: setBad,
    }
    newValues[type]++
    newValues.all++

    valueSetters[type](newValues[type])
    setAll(newValues.all)
    setAverage((newValues.good - newValues.bad) / newValues.all)
    setPositive((newValues.good / newValues.all) * 100)
  }

  return (
    <div>
      <Title text={"give feedback"}></Title>
      <Button text={"good"} valueSetter={() => updater("good")}></Button>
      <Button text={"neutral"} valueSetter={() => updater("neutral")}></Button>
      <Button text={"bad"} valueSetter={() => updater("bad")}></Button>
      <Title text={"statistics"}></Title>
      <Statistics all={all} values={{ good, bad, neutral, all, average, positive }}></Statistics>
    </div>
  )
}

export default App
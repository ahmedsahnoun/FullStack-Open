import { useState } from 'react'

const AnecdoteDisplayer = ({ title, anecdote, points }) => {
  return (
    <>
      <h1> {title} </h1>
      <div> {anecdote} </div>
      <div> has {points} points </div>
    </>
  )
}

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

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const getRandomIndex = (max) => {
    return Math.floor(Math.random() * max);
  }

  const vote = (index) => {
    const pointsCopy = [...points]
    pointsCopy[index]++
    setPoints(pointsCopy)

    if (pointsCopy[index] > points[popular])
      setPopular(index)
  }

  const [selected, setSelected] = useState(0)
  const [popular, setPopular] = useState(0)

  return (
    <>
      <AnecdoteDisplayer title="Anecdote of the day" anecdote={anecdotes[selected]} points={points[selected]}></AnecdoteDisplayer>
      <button onClick={() => vote(selected)}>vote</button>
      <button onClick={() => setSelected(getRandomIndex(anecdotes.length))}>next anecdote</button>
      <AnecdoteDisplayer title="Anecdote with most votes" anecdote={anecdotes[popular]} points={points[popular]}></AnecdoteDisplayer>
    </>
  )
}

export default App
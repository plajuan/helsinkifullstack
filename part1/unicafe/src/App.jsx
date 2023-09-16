import { useState } from 'react'

const FeedAttribute = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const FeedButton = (props) => {
  return (
    <button onClick={props.click}>
      {props.text}
    </button>
  )
}

const FeedVote = (props) => {  
  return(
    <p>{props.text} {props.votes} {props.suffix}</p>
  )
}


const App = () => {
  // salve os cliques de cada botão em seu próprio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <FeedAttribute text="give feedback" />
      <FeedButton text="good" click={ ()=>setGood(good+1) }/>
      <FeedButton text="neutral" click= { ()=>setNeutral(neutral+1) } />
      <FeedButton text="bad" click= { ()=>setBad(bad+1) } />
      <FeedAttribute text="statistics" />
      <FeedVote text="good" votes={good} />
      <FeedVote text="neutral" votes={neutral} />
      <FeedVote text="bad" votes={bad} />
      <FeedVote text="all" votes={good+neutral+bad} />
      <FeedVote text="average" votes={(good-bad)/(good+neutral+bad)} />
      <FeedVote text="positive" votes={ (good/(good+neutral+bad))*100 } suffix="%" />
      
    </div>
  )
}

export default App
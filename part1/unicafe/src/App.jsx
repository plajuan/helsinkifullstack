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

const Statistics = (props)=>{
  return(
<>    
    <div>
      <FeedAttribute text="give feedback" />
      <FeedButton text="good" click={ props.goodClick }/>
      <FeedButton text="neutral" click= { props.neutralClick } />
      <FeedButton text="bad" click= { props.badClick } />
      <FeedAttribute text="statistics" />
      <FeedVote text="good" votes={props.good} />
      <FeedVote text="neutral" votes={props.neutral} />
      <FeedVote text="bad" votes={props.bad} />
      <FeedVote text="all" votes={ props.all } />
      <FeedVote text="average" votes={ props.average} />
      <FeedVote text="positive" votes={ props.positive } suffix="%" />
      
    </div>
    </>
  ) 
}

const App = () => {
  // salve os cliques de cada botão em seu próprio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const updateAll = (good,neutral,bad) =>{
    setAll(good+neutral+bad)
    setAverage((good-bad)/(good+neutral+bad))
    setPositive((good/(good+neutral+bad))*100)
  }
  
  const goodClick = () =>{
    const goodTemp = good+1
    setGood(goodTemp)
    updateAll(goodTemp, neutral, bad)
  }

  const neutralClick = () =>{
    const neutralTemp = neutral+1 
    setNeutral(neutralTemp)
    updateAll(good, neutralTemp, bad)
  }

  const badClick = ()=>{
    const badTemp = bad+1
    setBad(badTemp)
    updateAll(good, neutral, badTemp)
  }

  return (
    <Statistics goodClick={goodClick} neutralClick={neutralClick} badClick={badClick}
      good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
  )
}

export default App
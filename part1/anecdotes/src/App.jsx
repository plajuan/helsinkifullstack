import { useState } from 'react'

const Anecdote = (props)=>{
  return (
  <>
  {props.anecdote}
  <br></br>
  has {props.votes} votes
  <br></br>
  </>
  )
}

const Title = (props)=>{
  return (
    <h1>{props.text}</h1>
  )
}

const App = () => {
  const anecdotes = [
    'Se fazer algo dói, faça isso com mais frequência.',
    'Contratar mão de obra para um projeto de software que já está atrasado, faz com que se atrase mais ainda!',
    'Os primeiros 90% do código correspondem aos primeiros 10% do tempo de desenvolvimento... Os outros 10% do código correspondem aos outros 90% do tempo de desenvolvimento.',
    'Qualquer tolo escreve código que um computador consegue entender. Bons programadores escrevem código que humanos conseguem entender.',
    'Otimização prematura é a raiz de todo o mal.',
    'Antes de mais nada, depurar é duas vezes mais difícil do que escrever o código. Portanto, se você escrever o código da forma mais inteligente possível, você, por definição, não é inteligente o suficiente para depurá-lo.',
    'Programar sem o uso extremamente intenso do console.log é o mesmo que um médico se recusar a usar raio-x ou testes sanguíneos ao diagnosticar pacientes.',
    'A única maneira de ir rápido é ir bem.'
  ]
  
  /**
   * Chooses a random anecdote to display on the page
   * @returns A random number between zero and the length of anecdotes array
   */
  function random(){
    return Math.floor(Math.random() * ( (anecdotes.length-1) - 0 + 1)) + 0;
  }

  /**
   * Adds one vote to the selected anecdote
   */
  function addVotes(){
    const arr = [...votes]
    arr[selected] += 1    
    setVotes(arr)
  }

  /**
   * Finds the index of the most voted anecdotes
   * @returns The index of the most voted anecdotes or -1 if there 
   * are no votes recorded. If there are two anecdotes with the same
   * number of votes, it returns the first occurrence found on the array.
   */
  function findMaxIdx(){
    const max = Math.max(...votes)
    if (max === 0){
      return -1
    }
    const idx = votes.indexOf(max)
    console.log('most voted idx', idx)
    return idx
  }
  
  const [selected, setSelected] = useState(random())  
  const [votes, setVotes] = useState( anecdotes.map( (x)=> 0 ) )
  console.log('selected', selected)
  console.log('votes', votes)
  const maxId = findMaxIdx()

  if(maxId === -1){
    return (
      <div>
        <Title text='Anecdote of the day' />
        <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
        <button onClick={()=>addVotes()}>vote</button>
        <button onClick={()=>setSelected(random())}>next anecdote</button>        
      </div>
    )
  } else {
    return (
      <div>
        <Title text='Anecdote of the day' />        
        <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
        <button onClick={()=>addVotes()}>vote</button>
        <button onClick={()=>setSelected(random())}>next anecdote</button>
        <Title text='Anecdote with most votes' />        
        <Anecdote anecdote={anecdotes[maxId]} votes={votes[maxId]} />
      </div>
    )
  }
  
}

export default App
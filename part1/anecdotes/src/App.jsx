import { useState } from 'react'

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
  
  function random(){
    return Math.floor(Math.random() * ( (anecdotes.length-1) - 0 + 1)) + 0;
  }

  function addVotes(){
    const arr = [...votes]
    arr[selected] += 1
    setVotes(arr)
  }
  
  const [selected, setSelected] = useState(random())  
  const [votes, setVotes] = useState( anecdotes.map( (x)=> 0 ) )
  console.log('selected', selected)
  console.log('votes', votes)
  return (
    <div>
      {anecdotes[selected]}
      <br></br>
      has {votes[selected]} votes
      <br></br>
      <button onClick={()=>addVotes()}>vote</button>
      <button onClick={()=>setSelected(random())}>
        next anecdote
      </button>      
    </div>
  )
}

export default App
const Total = (props) => {
    console.log(props)
    const result = props.parts.reduce(
        (a, c) => {
            return a + c.exercise
        }, 
        0
    )
    
    return (
        <p>Number of exercises {result}</p>
    )
}

export default Total
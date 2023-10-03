const Total = (props) => {    
    const result = props.parts.reduce(
        (a, c) => {
            return a + c.exercises
        }, 
        0
    )
    
    return (
        <p><strong>Number of exercises {result}</strong></p>
    )
}

export default Total
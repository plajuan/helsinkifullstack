import Total from "./Total"

const Part = (props) => {    
    const {parts} = props
    console.log(parts)
    return (
        <>
        {
            parts.map(
                item => {
                    return(
                    <>
                    <p key={item.id}>{item.name} {item.exercise}</p>                    
                    </>
                    )                    
                }
            )            
        }
        <Total parts={parts}></Total>
        </>
    )
}

export default Part
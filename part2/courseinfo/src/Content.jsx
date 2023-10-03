import Part from "./Part"

const Content = (props) => {    
    const {courses} = props
    return (
        <>        
        {courses.map(
            item=>{
                return (
                <>
                <h2 key={item.id}>{item.name}</h2>
                <Part parts={item.parts} />
                </>
                )
            }            
        )}        
        </>        
    )
}

export default Content
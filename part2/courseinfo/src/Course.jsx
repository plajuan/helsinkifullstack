import Content from "./Content";
import Header from "./Header"

const Course = (props)=>{
console.log(props);
    let headerStr = "Web development curriculum"    
    return (
        <>
        <Header text={headerStr} />
        <Content courses={props.courses} />
        </>
    )
}
export default Course
const Header = ({name}) =>(<h2> {name} </h2>)

const Part = ({part}) => (<p>{part.name} {part.exercises}</p>)

const Sum = ({course}) => {
  const total = () => course.parts.reduce((sum, part) =>( sum += part.exercises), 0)
  return <b>total of {total()} exercises</b>
}

const Course = ({course}) =>{

  const total = () => course.parts.reduce((sum, part) =>( sum += part.exercises), 0)
  return (
    <div>
    <Header name={course.name}/>
      {course.parts.map(part => <Part part={part} key={part.id}/>)}
      <Sum course={course}/>
    </div>
  )
}

export default Course

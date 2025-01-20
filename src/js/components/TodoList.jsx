import React, { useEffect, useState } from 'react'

const TodoList = () => {

    const [Todos, setTodos] = useState([])

    function getTodos(){
        console.log('gettodos')
        fetch("https://playground.4geeks.com/todo/users/Mike")
        .then( (response)=> response.json())
        .then( (data)=> setTodos(data.todos) )
    }


    useEffect(()=>{
        console.log('se cargo el componente')
        getTodos()
    },[])
    
    return(
        <>
        <button>add</button>
        {Todos.map((Todos, index)=> <h1 key={index}> todo: {Todos.label}</h1> )}
        </>
    )
};
export default TodoList
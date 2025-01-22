import React, { useEffect, useState } from 'react';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState(""); 

    
    function getTodos() {
        fetch("https://playground.4geeks.com/todo/users/Mike")
            .then((response) => response.json())
            .then((data) => setTodos(data.todos))
            .catch((error) => console.error("Error fetching todos:", error));
    }

    
    function addTodo(e) {
        e.preventDefault();

        if (newTodo.trim() === "") {
            return; 
        }

        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "label": newTodo,
                "is_done": false
            })
        };

        fetch("https://playground.4geeks.com/todo/todos/Mike", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setTodos((prevTodos) => [...prevTodos, data.todo]);
                setNewTodo(""); 
            })
            .catch((error) => console.error("Error adding todo:", error));
    }

    
    function deleteTodo(index) {
        
        const newList = todos.filter((_, idx) => idx !== index);
        setTodos(newList);
    }

    useEffect(() => {
        console.log('Componente cargado');
        getTodos();
    }, []);

    return (
        <div className="container">
            <h1 className="text-center my-4">Todos</h1>
            <form onSubmit={addTodo}>
                <div className="input-group mb-0">
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setNewTodo(e.target.value)}
                        value={newTodo}
                        placeholder="Add a task"
                    />
                </div>
            </form>
            <ul className="list-group">
                {todos.map((todo, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {todo.label}
                        <button className="btn" onClick={() => deleteTodo(index)}>
                            <i className="fa-solid fa-x"></i>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;

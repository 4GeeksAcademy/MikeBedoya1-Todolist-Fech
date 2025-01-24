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


    function deleteTodo(id) {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };

        fetch("https://playground.4geeks.com/todo/todos/" + id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result),
                    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
            })
    }


    function deleteAll() {
        console.log('se elimino todo')
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };

        fetch("https://playground.4geeks.com/todo/users/Mike", requestOptions)
            .then((response) => response.text())
            .then(() => {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify({
                    "name": "Mike",
                    "id": 19
                });

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                };

                fetch("https://playground.4geeks.com/todo/users/Mike\n", requestOptions)
                    .then((response) => response.text())
                    .then((result) => console.log(result));
                    setNewTodo([]);
                    setNewTodo("");
            }
            )
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
                    <button type='button' className='gap-3 bg-danger' onClick={deleteAll}>Delete all</button>
                </div>
            </form>
            <ul className="list-group">
                {todos.map((todo, index) => (
                    <li key={todo.id || index} className="list-group-item d-flex justify-content-between align-items-center">
                        {todo.label}
                        <button className="btn" onClick={() => deleteTodo(todo.id)}>
                            <i className="fa-solid fa-x"></i>
                        </button>
                    </li>
                ))}
                <div className="my-1 list-group-item d-flex justify-content-between mt-0">
                    <h6>{todos.length} item left</h6>
                </div>
            </ul>
        </div>
    );
};

export default TodoList;

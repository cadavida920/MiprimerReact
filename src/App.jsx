import React, { Fragment, useState, useRef, useEffect } from "react";
import { stringify, v4 as uuid } from 'uuid';
import { TodoList } from "./components/TodoList";


const key = "todoApp.todos";


export function App() {
    const [todos, setTodos] = useState([
        { id: 1, task: "tarea 1", completed: false },
    ]);

    const todoTaskRef = useRef();

    useEffect(() => {
        const StoredTodos = JSON.parse(localStorage.getItem(key));
        if (StoredTodos) {
            setTodos(StoredTodos);
        }
    }, [])


    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(todos))
    }, [todos]);


    const toggleTodo = (id) => {
        const newtodos = [...todos];
        const todo = newtodos.find((todo) => todo.id == id);
        todo.completed = !todo.completed;
        setTodos(newtodos);
    };


    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if (task == ' ') return;
        setTodos((prevTodos) => {
            return [...prevTodos, { id: uuid(), task, completed: false }];
        });
        todoTaskRef.current.value = null;
    };


    const handleClearAll = () => {
        const newtodos = todos.filter((todo) => !todo.completed)
        setTodos(newtodos);
    };

    return (
        <div  style={{ display: 'table-cell', textAlign: 'center', verticalAlign: 'middle' }}>

            <Fragment>
                
                <TodoList todos={todos} toggleTodo={toggleTodo} />
                <input ref={todoTaskRef} type="text" placeholder="nuevaTarea" />
                <button onClick={handleTodoAdd}> ➕</button>
                <button onClick={handleClearAll}> 🗑️</button>
                <div>
                    te quedan {todos.filter((todos) => !todos.completed).length} tareas por terminar
                </div>

                <img src="./Zetap2.jpeg" alt="Mi imagen" style={{ windth: '500px', height: '500px' }} />
                
            </Fragment>
        </div>

    );
}
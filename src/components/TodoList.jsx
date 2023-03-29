import React from 'react'
import { Todoitem } from './Todoitem';

export  function TodoList({todos, toggleTodo }) {
  return (
    <ul>
         {todos.map((todo) => (
            <Todoitem key = {todo.id} todo={todo}  toggleTodo={toggleTodo} />
        ))}
    </ul>
  );
} 


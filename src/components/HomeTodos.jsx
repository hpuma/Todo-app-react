import React from 'react';

function HomeTodos({todos}) {
    return (
        <ul>
        { todos.map((todo) => <li key={todo._id}>{todo.todo_task}</li>)}
        </ul>
    );
}

export default HomeTodos;
import React, { useState, useEffect, useRef } from 'react';
import InputAdd from './elements/InputAdd';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { getTodo, postTodo, putTodo, deleteTodo } from '../utils/api';
import useIsActive from '../hooks/useIsActive';

function Todo({listId}) {
    //states
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [editTodo, setEditTodo] = useState("");
    const [todoId, setTodoId] = useState(null);
    
    //util states
    const editState = useIsActive();
    const submitState = useIsActive();
    const [loading, setLoading] = useState(false);

    //ref
    const editInputRef = useRef();
    useOnClickOutside(editInputRef, editState.deactivate);

    //util functions
    function onChangeNewTodo(event) {
        setNewTodo(event.target.value);
    }

    function onChangeEditTodo(event) {
        setEditTodo(event.target.value);
    }

    function onClickInput(event) {
        editState.activate()
        setTodoId(event.target.name);
        setEditTodo(event.target.value);
    } 

    //remount when update todos
    useEffect( () => {
        const getTodoAPI = (listId) => { //define api call
            getTodo(listId)
            .then((response) => {
                setLoading(false);
                const resTodos = response.data.todos;
                setTodos(resTodos);
            })
            .catch((error) => {
                console.log(error);
            });
        };
        setLoading(true);
        getTodoAPI(listId);
    }, [submitState.isActive, listId]);

    async function deleteTodoAPI(todoId) {
        if (!todoId) return;

        await deleteTodo(todoId)
        .then((response) => {
            submitState.toggle();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    //edit todo
    const handleEditTodoForm = async (event) => {
        event.preventDefault();
        if (!(editTodo && todoId)) return;
        
        const data = {
            todo_task: editTodo
        }

        await putTodo(todoId, data)
        .then((response) => {
            submitState.toggle();
            //instead of refreshing entire thing, might be better to use the response to rerender only that todo
        })
        .catch((error) => {
            console.log(error);
        });
        setTodoId(null);
    }

    //new todo
    const handleNewTodoForm = async (event) => {
        event.preventDefault();
        if (!newTodo) return;
        
        const data = {
            todo_task: newTodo
        }

        await postTodo(listId, data)
        .then(() => {
            setNewTodo("");
            submitState.toggle();
        })
        .catch((error) => {
            console.log(error);
        });
        editState.deactivate();
    }

    return(
        <>
            { (loading)
            ? <div className="loading">Loading todos...</div>
            : (todos[0])
            ? <div className="todo-container">
                { todos.map((todo) => 
                    <div key={todo._id} className="flex-row-todo">
                        <button className="delete-btn" onClick={ ()=>deleteTodoAPI(todo._id) }>✖</button>
                        { (editState.isActive && (todo._id === todoId))
                            ? <div ref={editInputRef} className="ref-container">
                                <div className="todo-input">
                                    <form onSubmit={handleEditTodoForm} > 
                                        <input id="input-edit-todo-task" name="editTodo" value={editTodo} onChange={onChangeEditTodo} />
                                        <input type="submit" value="Submit" hidden></input>
                                    </form>
                                </div>
                            </div>
                            : <div className="todo-input"><button className="hidden-btn" name={todo._id} value={todo.todo_task} onClick={onClickInput}>{todo.todo_task}</button></div>
                        }
                    </div>
                )}
            </div>
            : <p className="body">Create your first task!</p>
            }
            
            <div id="input-add-todo">
            <InputAdd handleSubmitForm={handleNewTodoForm} inputId="todo-name" placeholder="Enter Task" value={newTodo} onChangeInput={onChangeNewTodo} buttonId="todo-add" buttonLabel="Add task" />
            </div>
        </>
    );
}

export default Todo;
import express from "express";
import controllers  from "controllers";
import AuthenticateToken from "../AuthenticateToken";

const { todoCtrl } = controllers;
const todoRouter = express.Router();
// GETS ALL THE TODOS OF THE CURRENT USER LOGGED IN
// Route: /todo/  
// We have User._id and req.user.user_name
todoRouter.route('/todos').get(AuthenticateToken, (req, res) => {
  todoCtrl.getAllTodos(req, res);
});


// GETS A SPECIFIC Todo BASED ON THE :todoId, object ID of todo
todoRouter.route('/:todoId').get(AuthenticateToken, (req, res) => {
    todoCtrl.getTodo(req, res);
});


// Creates a new todo for a specific list
// Needs list._id(ObjID) as params and todo_task in the body
todoRouter.route('/:listId').post(AuthenticateToken, (req, res) => {
    todoCtrl.createTodo(req, res);
});

// Updates a the todo_task of a specific todo 
// Needs: todoId(ObjID)
todoRouter.route('/:todoId').put(AuthenticateToken, (req, res) => {
    todoCtrl.updateTodo(req, res);
});

// Deletes a todo from a specific list
// Just relies on :todoId parameter
todoRouter.route('/:todoId').delete(AuthenticateToken, (req, res) => {
    todoCtrl.deleteTodo(req, res);
});


export default todoRouter;

import express from "express";
import controllers from "controllers";
import AuthenticateToken  from "../AuthenticateToken";

const  { createList, getList, getTodos, getAllLists, getAllListsAndTodos, updateList, deleteList } = controllers;
const listRouter = express.Router();
// Route:   /list/  
// We get all the lists that belong to a specific user.
// We have the User._id from the token authentication to retrieve all lists
listRouter.route('/').get(AuthenticateToken, (req, res) => {
    getAllLists(req, res);
});

// Route:   /list/all  
// We get all the lists and their todos that belong to a specific user.
// We have the User._id from the token authentication to retrieve all listsandtodos
listRouter.route('/all').get(AuthenticateToken, (req, res) => {
    console.log("HI")
    getAllListsAndTodos(req, res);
});

// Route: /list/:listId
// We get a specific list based on it's _id from :listId params
listRouter.route('/:listId').get(AuthenticateToken, (req, res) => {
    getList(req, res);
});


// Route: /list/
// We assume we have req.body.list_name and User._id from the token
listRouter.route('/').post(AuthenticateToken, (req, res) => {
    // Create List
   createList(req, res);
});


// Route: /list/:listId
// We delete a list based on it's :listId
listRouter.route('/:listId').delete(AuthenticateToken, (req, res) => {
   deleteList(req, res);
});


// Route: /list/:listId
// Update the list's name : list_name, we expect  req.body.list_name
listRouter.route('/:listId').put(AuthenticateToken, (req, res) => {
    updateList(req, res);
});


// Route:     list/:ListId(OBJECT)
// Gets a specific set of todos based on its :listId
listRouter.route('/:listId/todos').get(AuthenticateToken, (req, res) => {
    getTodos(req, res);
});


// Route:    list/:listId(OBJECT)/
// Creates a new todo for :listId
// expecting : req.body.todo_task,  ALREADY HAVE USER ID
listRouter.route('/:listId/todo').post(AuthenticateToken, (req, res) => {
    createTodo(req, res);
});

export default listRouter;
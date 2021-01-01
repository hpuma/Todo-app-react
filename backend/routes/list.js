import express from "express";

const listCtrl = require("../controllers/list");
const manager = require("../AuthenticateToken");
const todoCtrl = require('../controllers/todo');

const router = express.Router();
// Route:   /list/  
// We get all the lists that belong to a specific user.
// We have the User._id from the token authentication to retrieve all lists
router.route('/').get(manager.AuthenticateToken, (req, res) => {
    listCtrl.getAllLists(req, res);
});

// Route:   /list/all  
// We get all the lists and their todos that belong to a specific user.
// We have the User._id from the token authentication to retrieve all listsandtodos
router.route('/all').get(manager.AuthenticateToken, (req, res) => {
    listCtrl.getAllListsAndTodos(req, res);
});

// Route: /list/:listId
// We get a specific list based on it's _id from :listId params
router.route('/:listId').get(manager.AuthenticateToken, (req, res) => {
    listCtrl.getList(req, res);
});


// Route: /list/
// We assume we have req.body.list_name and User._id from the token
router.route('/').post(manager.AuthenticateToken, (req, res) => {
    // Create List
    listCtrl.createList(req, res);
});


// Route: /list/:listId
// We delete a list based on it's :listId
router.route('/:listId').delete(manager.AuthenticateToken, (req, res) => {
    listCtrl.deleteList(req, res);
});


// Route: /list/:listId
// Update the list's name : list_name, we expect  req.body.list_name
router.route('/:listId').put(manager.AuthenticateToken, (req, res) => {
    listCtrl.updateList(req, res);
});


// Route:     list/:ListId(OBJECT)
// Gets a specific set of todos based on its :listId
router.route('/:listId/todos').get(manager.AuthenticateToken, (req, res) => {
    listCtrl.getTodos(req, res);
});


// Route:    list/:listId(OBJECT)/
// Creates a new todo for :listId
// expecting : req.body.todo_task,  ALREADY HAVE USER ID
router.route('/:listId/todo').post(manager.AuthenticateToken, (req, res) => {
    todoCtrl.createTodo(req, res);
});

module.exports = router;
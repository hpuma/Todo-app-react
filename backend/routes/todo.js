const todoCtrl = require("../controllers/todo");
const router = require("express").Router();
const manager = require("../AuthenticateToken");

// GETS ALL THE TODOS OF THE CURRENT USER LOGGED IN
// Route: /todo/  
// We have User._id and req.user.user_name
router.route('/todos').get(manager.AuthenticateToken, (req, res) => {
  todoCtrl.getAllTodos(req, res);
});


// GETS A SPECIFIC Todo BASED ON THE :todoId, object ID of todo
router.route('/:todoId').get(manager.AuthenticateToken, (req, res) => {
    todoCtrl.getTodo(req, res);
});


// Creates a new todo for a specific list
// Needs list._id(ObjID) as params and todo_task in the body
router.route('/:listId').post(manager.AuthenticateToken, (req, res) => {
    todoCtrl.createTodo(req, res);
});

// Updates a the todo_task of a specific todo 
// Needs: todoId(ObjID)
router.route('/:todoId').put(manager.AuthenticateToken, (req, res) => {
    todoCtrl.updateTodo(req, res);
});

// Deletes a todo from a specific list
// Just relies on :todoId parameter
router.route('/:todoId').delete(manager.AuthenticateToken, (req, res) => {
    todoCtrl.deleteTodo(req, res);
});


module.exports = router;

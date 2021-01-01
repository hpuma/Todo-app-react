import { Todo } from "models";

// Finds the list._id base on the list name and the user._id
const createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      list: req.params.listId,
      user: req.user._id,
      todo_task: req.body.todo_task,
    });
    const todoStatus = await todo.save();
    res.json({message: "New todo-item has been created"});
  } 
  catch(err){
    console.error(err);
    res.status(422).json({message: "An error occured creating this todo-item"});
  }
};

// Retrieves a todo object by referring to the todoId in the parameters
const getTodo = async (req, res) => { 
  try { 
    const targetTodo = Todo.findOne({_id: req.params.todoId, user: req.user._id});
    res.json({targetTodo: targetTodo});
  }
  catch(err){
    console.error(err);
    res.status(404).json({message: "An error occured with retrieving the todo-item"});
  }
};


// First finds all the list that belong to the user, then finds the todos for each of those lists.
const getAllTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find({user: req.user._id});
    res.json({allTodos: allTodos});    
  }
  catch(err){
    console.error(err);
    res.status(404).json({message: "An error occured when getting your todos"})
  }
};

const updateTodo = async (req, res) => {
  try {
    const {todoId} = req.params;
    const updated = await Todo.findOneAndUpdate({_id: todoId, user: req.user._id}, {todo_task: req.body.todo_task});
    res.json({update: updated});
  }
  catch(err){
    console.error(err);
    res.status(400).json({message: "There was an issue with your request"});
  }
}

// Finds the list._id through the req.body.list_name
// Then deletes a todo based on the list_id and req.body.todo_task
const deleteTodo = async (req, res) => {
  try {
    const {todoId} = req.params;
    const deleteTodo = await Todo.deleteOne({user: req.user._id, _id: todoId});
    res.json({message: "Todo deleted"});
  }
  catch(err){
    console.error(err);
    res.status(404).json({message: "There was an issue deleting your todo"});
  }
};

module.exports = {createTodo, getTodo, getAllTodos, updateTodo, deleteTodo};
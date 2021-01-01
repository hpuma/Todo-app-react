import { List, Todo } from "models";
import mongoose from "mongoose";

// Creates a list through req.params.listId as its list_name and req.user._id as user
//NOTE: MUST CHECK FOR DUPLICATES
export const createList = async (req, res) => {
  try {
    const newList = new List({
      user: req.user._id,
      list_name: req.body.list_name,
    });
    const listCreated = await newList.save();
    res.status(201).json({message: "Your list has been created successfully"});
  } 
  catch(err){
    console.log(err);
    res.status(422).json({message: "There was an error with creating your list"});
  }
};

export const getTodos = async (req, res) => {
  try {
    const {listId} = req.params;

    const getTodos = await Todo.find({list:listId, user:req.user._id});
    res.json({todos: getTodos, message: "Successfully retrieved todos from list"});
  }
  catch(err){
    console.error(err);
    res.status(404).json({message: "There was an error in getting the todos from the list"});
  }
};

export const getList = async (req, res) => {
  try {
    const {listId} = req.params;
    const targetList = await List.findOne({_id:listId, user: req.user._id}).select('list_name');
    res.json({targetList:targetList});
  }
  catch(err){
    console.error(err);
    res.status(404).json({message: "There was an issue with finding the list"});
  }
};

export const getAllLists = async (req, res) =>{
  try{
    const allLists = await List.find({user: req.user._id}).select('list_name');
    res.json({allLists:allLists});
  }
  catch(err){
    console.error(err);
    res.status(404).json({message: "There was an issue finding lists"});
  }
};

export const updateList = async (req, res) => {
  try {
    const targetList = await List.findOneAndUpdate({user: req.user._id, _id: req.params.listId}, {list_name: req.body.list_name});
    res.json({message: "Successfully updated the list name"})
  }
  catch (err) {
    console.log(err);
    res.status(400).json({message: "There was an error in updating the list name"});
  }
};

// Deletes a specific list and its corresponding todos
export const deleteList = async (req, res) => {
  try {
    const [listId, userId] = [req.params.listId, req.user._id];
   
    const deletedList = await List.deleteOne({user: userId, _id: listId});
    const deletedTodos = await Todo.deleteMany({user: userId, list: listId});

    res.json({message: "List deleted"});
  } 
  catch(err){
    console.log(err);
    res.status(404).json({message: "There was an error deleting your list"});
  }
};

// gets all lists and their todos as an array inside
export const getAllListsAndTodos = async (req, res) =>{
  try{
    const userId =  req.user._id;
    const allLists = await List.aggregate([
      { $match:
        { user: mongoose.Types.ObjectId(req.user._id) }
      },
      { $project: 
        { _id: 1, list_name: 1, createdAt: 1, updatedAt: 1 }
      },
      { $lookup:
        {
          from: 'todos',
          localField: '_id',
          foreignField: 'list',
          // pipeline: [
          //   { $project: { user: 0 }}
          // ],
          as: 'todos'
        }
      }
    ]);

    res.json({allLists:allLists});       
  }
  catch(err){
    console.error(err);
    res.status(404).json({message: "There was an issue finding lists"});
  }
}

export default { createList, getList, getTodos, getAllLists, getAllListsAndTodos, updateList, deleteList };
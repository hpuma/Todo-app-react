const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const List = require('./list.model');

const todoSchema = new Schema(
  {
    list:{
      type: Schema.Types.ObjectId,
      ref:'List',
      required: true,
    },
    user:{
      type: Schema.Types.ObjectId,
      ref:'User',
      required: true
    },
    todo_task: {
      type: String,
      required: true,
      trim: true,
    }
  },
  { timestamps: true }
);

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo 
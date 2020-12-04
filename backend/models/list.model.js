const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model');

const listSchema = new Schema(
    {
      list_name:{
        type: String,
        required: true,
      },
      user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true,
      },
    },
    { timestamps: true }
  );


const List = mongoose.model('List', listSchema);
module.exports = List;
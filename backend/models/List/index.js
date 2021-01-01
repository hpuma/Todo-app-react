import mongoose from "mongoose";

const Schema = mongoose.Schema;
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
export default List;
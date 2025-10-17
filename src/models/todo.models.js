const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        description:{
            type: String,
            default: '',
            trim: true,
        },
        status:{
            type: String,
            enum: ['pending', 'in-progress', 'completed'],
            default: 'pending'
        },
    },
    {
        timestamps: true,
    }
);

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
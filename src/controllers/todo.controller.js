const Todo = require("../models/todo.models");

const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        if(!title){
            return res.status(400).json({ error: "Title is required" });
        }
        const todo = await Todo.create({title, description});

        res.status(201).json({
            message:"To-Do created successfully",
            todo,
        });
    } catch (error){
        console.error("Error creating To-Do:", error.message)
        res.status(500).json({message: "Server error while creating To-Do"});
    }
    };

module.exports ={createTodo};
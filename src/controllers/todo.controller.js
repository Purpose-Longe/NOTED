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

const getTodos = async (req, res) =>{
    try{
        const { status } = req.query;
        let filter = {};

        const allowedStatuses = ["pending", "in-progress", "completed"];

        if(status){
            const normalizedStatus = status.toLowerCase();

            if(!allowedStatuses.includes(normalizedStatus)){
                return res.status(400).json({
                    success:false,
                    message:`Invalid status value. Allowed values are: ${allowedStatuses.join(', ')}`
                });

            }

            filter.status = normalizedStatus;
        }

        const todos = await Todo.find(filter);

        res.status(200).json({
            success:true,
            count:todos.length,
            data:todos,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:'Failed to fetch todos',
            error: error.message,
        });
    }
};


module.exports ={createTodo,getTodos};
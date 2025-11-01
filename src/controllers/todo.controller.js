const { default: mongoose } = require("mongoose");
const Todo = require("../models/todo.models");

const createTodo = async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  try {
    const todo = await Todo.create({ title, description });
    res.status(201).json({
      success: true,
      message: "To-Do created successfully",
      data: todo,
    });

  } catch (error) {
    console.error("Error creating To-Do:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating To-Do",
      error: error.message,
    });
  }
};


const getTodos = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};

    const allowedStatuses = ["pending", "in-progress", "completed"];

    if (status) {
      const normalizedStatus = status.toLowerCase();

      if (!allowedStatuses.includes(normalizedStatus)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status value. Allowed values are: ${allowedStatuses.join(", ")}`,
        });
      }

      filter.status = normalizedStatus;
    }

    const todos = await Todo.find(filter);

    if (todos.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No To-Do items found",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "To-Do items fetched successfully",
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    console.error("Error fetching To-Do items:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching To-Do items",
      error: error.message,
    });
  }
};


const getTodoById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid To-Do ID format",
    });
  }

  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "To-Do not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "To-Do item fetched successfully",
      data: todo,
    });

  } catch (error) {
    console.error("Error fetching To-Do by ID:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching To-Do",
      error: error.message,
    });
  }
};


const updateTodo = async (req,res) => {
     const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message:"Invalid To-Do ID format"
            });
        }

    try{
       const{title,description,status} = req.body;

       const updates ={};
       if (title) updates.title =title;
       if (description) updates.description =description;

       const allowedStatuses = ["pending","in-progress","completed"];

       if (status){
        const normalizedStatus = status.toLowerCase();

        if (!allowedStatuses.includes(normalizedStatus)){
            return res.status(400).json({
                success:false,
                message:`Invalid status value. Allowed values: ${allowedStatuses.join(",")}`
            });
        }
        updates.status = normalizedStatus;
       }
       const updatedTodo = await Todo.findByIdAndUpdate(id,updates,{
        new:true,
        runValidators:true,
       });
       if (!updatedTodo){
        return res.status(404).json({
            success:false,
            message:"To-Do not found"
        })
       }
       res.status(200).json({
        success:true,
        message:"To-Do updated successfully",
        data:updatedTodo,
       });

       }catch(error){
        console.error("Error updating To-Do :", error);

        res.status(500).json({
            success:false,
            message:"Server error while updating To-Do",
            error:error.message,
        });
       }
    };

    const deleteTodo = async (req,res) =>{
        try{
            const {id} = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)){
             return res.status(400).json({
                success:false,
                message:"Invalid To-Do ID format",
             });
            }
            const deletedTodo = await Todo.findByIdAndDelete(id);
            if (!deletedTodo){
                return res.status(404).json({
                    success:false,
                    message:"To-Do not found-nothing was deleted",
                });
            }
            res.status(200).json({
                success:true,
                message:"To-Do deleted successfully",
                data:deletedTodo
            });
        }catch(error){
            console.error("Error deleting To-Do:",error);
            res.status(500).json({
                success:false,
                message:"Server error while deleting To-Do",
                error:error.message,
            });
 
        }
        
    };


module.exports ={createTodo,getTodos,getTodoById,updateTodo,deleteTodo};
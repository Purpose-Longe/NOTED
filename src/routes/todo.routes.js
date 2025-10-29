const express = require("express");
const router = express.Router();
const { createTodo, getTodos } = require("../controllers/todo.controller");

router.post("/", createTodo);
router.get("/", getTodos);

module.exports = router;
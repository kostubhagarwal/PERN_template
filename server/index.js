const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//
//post
app.post("/[name of dt]", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all
app.get("/[name of dt]", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT*FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo
app.get("/[name of dt]/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT*FROM todo WHERE _id = $1", [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//put
app.put("/[name of dt]/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateToto = await pool.query(
      "UPDATE todo SET description = $1 WHERE _id = $2",
      [description, id]
    );
    res.json("Todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete
app.delete("/[name of datatable]/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteToto = await pool.query("DELETE FROM todo WHERE _id = $1", [
      id,
    ]);
    res.json("Todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});

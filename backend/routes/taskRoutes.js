const express = require("express");
const { body, validationResult } = require("express-validator");
const db = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  let sql = `
    SELECT 
      tasks.*,
      users.name AS assigned_name
    FROM tasks
    LEFT JOIN users ON tasks.assigned_to = users.id
  `;

  let values = [];

  if (req.user.role === "student") {
    sql += `
      WHERE tasks.assigned_to = ?
      OR tasks.group_name = ?
    `;
    values.push(req.user.id, req.user.group_name);
  }

  sql += " ORDER BY tasks.created_at DESC";

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Get tasks error:", err.message);
      return res.status(500).json({
        message: "Could not load tasks.",
      });
    }

    res.json(results);
  });
});

router.post(
  "/",
  authMiddleware,
  [
    body("title").notEmpty().withMessage("Task title is required"),
    body("deadline")
      .optional({ nullable: true, checkFalsy: true })
      .isISO8601()
      .withMessage("Deadline must be a valid date"),
    body("group_name")
      .optional({ nullable: true, checkFalsy: true })
      .isLength({ max: 50 })
      .withMessage("Group name is too long"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
      });
    }

    const { title, description, deadline, group_name } = req.body;

    let assignedUser = null;
    let taskGroup = null;
    let taskType = "personal";

    if (req.user.role === "admin") {
      if (!group_name) {
        return res.status(400).json({
          message: "Group name is required for admin tasks.",
        });
      }

      taskType = "group";
      taskGroup = group_name;
      assignedUser = null;
    } else {
      taskType = "personal";
      taskGroup = null;
      assignedUser = req.user.id;
    }

    db.query(
      `INSERT INTO tasks 
      (title, description, deadline, status, assigned_to, created_by, group_name, task_type) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description || "",
        deadline || null,
        "pending",
        assignedUser,
        req.user.id,
        taskGroup,
        taskType,
      ],
      (err, result) => {
        if (err) {
          console.error("Create task error:", err.message);
          return res.status(500).json({
            message: "Could not create task.",
          });
        }

        res.status(201).json({
          message: "Task created successfully.",
          taskId: result.insertId,
        });
      }
    );
  }
);

router.put(
  "/:id",
  authMiddleware,
  [
    body("title")
      .optional()
      .notEmpty()
      .withMessage("Task title cannot be empty"),
    body("status")
      .optional()
      .isIn(["pending", "done"])
      .withMessage("Status must be pending or done"),
    body("deadline")
      .optional({ nullable: true, checkFalsy: true })
      .isISO8601()
      .withMessage("Deadline must be a valid date"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
      });
    }

    const { id } = req.params;
    const { title, description, deadline, status } = req.body;

    let sql = `
      UPDATE tasks
      SET 
        title = COALESCE(?, title),
        description = COALESCE(?, description),
        deadline = COALESCE(?, deadline),
        status = COALESCE(?, status)
      WHERE id = ?
    `;

    let values = [title, description, deadline, status, id];

    if (req.user.role === "student") {
      sql += `
        AND (
          assigned_to = ?
          OR group_name = ?
        )
      `;
      values.push(req.user.id, req.user.group_name);
    }

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Update task error:", err.message);
        return res.status(500).json({
          message: "Could not update task.",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Task not found or not allowed.",
        });
      }

      res.json({
        message: "Task updated successfully.",
      });
    });
  }
);

router.delete("/:id", authMiddleware, (req, res) => {
  const { id } = req.params;

  let sql = "DELETE FROM tasks WHERE id = ?";
  let values = [id];

  if (req.user.role === "student") {
    sql += " AND assigned_to = ?";
    values.push(req.user.id);
  }

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Delete task error:", err.message);
      return res.status(500).json({
        message: "Could not delete task.",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Task not found or not allowed.",
      });
    }

    res.json({
      message: "Task deleted successfully.",
    });
  });
});

module.exports = router;
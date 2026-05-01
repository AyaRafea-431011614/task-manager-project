const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const db = require("../db");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("role")
      .optional()
      .isIn(["student", "admin"])
      .withMessage("Role must be student or admin"),
    body("group_name")
      .optional()
      .isLength({ max: 50 })
      .withMessage("Group name is too long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
      });
    }

    const { name, email, password, role, group_name } = req.body;

    try {
      db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) {
          console.error("Register error:", err.message);
          return res.status(500).json({
            message: "Could not register user.",
          });
        }

        if (results.length > 0) {
          return res.status(400).json({
            message: "Email already exists.",
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
          "INSERT INTO users (name, email, password, role, group_name) VALUES (?, ?, ?, ?, ?)",
          [
            name,
            email,
            hashedPassword,
            role || "student",
            role === "admin" ? null : group_name || null,
          ],
          (err) => {
            if (err) {
              console.error("Insert user error:", err.message);
              return res.status(500).json({
                message: "Could not create account.",
              });
            }

            console.log(`New user registered: ${email}`);

            res.status(201).json({
              message: "Account created successfully.",
            });
          }
        );
      });
    } catch (err) {
      console.error("Register server error:", err.message);
      res.status(500).json({
        message: "Something went wrong.",
      });
    }
  }
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
      });
    }

    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
      if (err) {
        console.error("Login error:", err.message);
        return res.status(500).json({
          message: "Could not login.",
        });
      }

      if (results.length === 0) {
        return res.status(400).json({
          message: "Invalid email or password.",
        });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid email or password.",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          group_name: user.group_name,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      console.log(`User logged in: ${email}`);

      res.json({
        message: "Login successful.",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          group_name: user.group_name,
        },
      });
    });
  }
);

module.exports = router;
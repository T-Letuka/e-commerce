const express = require("express");
const cors = require("cors");
const { pool } = require("./db");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

app.use(express.json());
app.use(cors());

app.use(
  "/images",
  express.static(
    path.join(__dirname, "public", "images", "almond", "public/stilleto")
  )
);

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send("Token is required");

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
};

app.get("/users", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.json(users.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Register endpoint
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );
    const newUser = result.rows[0];
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email= $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

// Get designs
app.get("/designs/:id", verifyToken, async (req, res) => {
  const designId = req.params.id;
  try {
    const designCheck = await pool.query(
      "SELECT * FROM designs WHERE id = $1",
      [designId]
    );
    if (designCheck.rows.length === 0) {
      return res.status(404).json({ exists: false });
    }
    res.status(200).json({ exists: true });
  } catch (err) {
    console.error("Failed to check design existence:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/designs/:id/like", verifyToken, async (req, res) => {
  const designId = req.params.id;
  const userId = req.user.id;

  try {
    const designCheck = await pool.query(
      "SELECT * FROM designs WHERE id = $1",
      [designId]
    );
    if (designCheck.rows.length === 0) {
      return res.status(404).json({ error: "Design not found" });
    }

    const likeCheck = await pool.query(
      "SELECT * FROM likes WHERE user_id = $1 AND design_id = $2",
      [userId, designId]
    );

    if (likeCheck.rows.length > 0) {
      await pool.query(
        "DELETE FROM likes WHERE user_id = $1 AND design_id = $2",
        [userId, designId]
      );
      return res.status(200).json({ message: "Design unliked" });
    } else {
      await pool.query(
        "INSERT INTO likes (user_id, design_id) VALUES ($1, $2)",
        [userId, designId]
      );
      return res.status(201).json({ message: "Design liked" });
    }
  } catch (err) {
    console.error("Failed to toggle like design:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/liked", verifyToken, async (req, res) => {
  try {
    const likedDesigns = await pool.query(
      `SELECT d.*, l.design_id
       FROM likes l
       JOIN designs d ON l.design_id = d.id
       WHERE l.user_id = $1`,
      [req.user.id]
    );
    res.json(likedDesigns.rows);
  } catch (error) {
    console.error("Failed to fetch liked designs:", error);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

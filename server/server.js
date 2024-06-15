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

// Like or unlike a design variant
app.post("/designs/:design_variant_id/like", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const designVariantId = parseInt(req.params.design_variant_id);

  try {
    // Check if already liked
    const existingLike = await pool.query(
      "SELECT * FROM likes WHERE user_id = $1 AND design_variant_id = $2",
      [userId, designVariantId]
    );

    if (existingLike.rows.length > 0) {
      // If liked, remove like
      await pool.query(
        "DELETE FROM likes WHERE user_id = $1 AND design_variant_id = $2",
        [userId, designVariantId]
      );
    } else {
      // If not liked, add like
      await pool.query(
        "INSERT INTO likes (user_id, design_variant_id) VALUES ($1, $2)",
        [userId, designVariantId]
      );
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error liking design variant:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get liked designs
app.get("/liked", verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "SELECT dv.id, dv.design_id, dv.image, dv.alt, d.name " +
        "FROM likes l " +
        "JOIN design_variants dv ON l.design_variant_id = dv.id " +
        "JOIN designs d ON dv.design_id = d.id " +
        "WHERE l.user_id = $1",
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching liked designs:", error);
    res.status(500).send("Internal Server Error");
  }
});
//popular by likes
app.get("/popular", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT d.id AS design_id, d.name AS item_name, dv.id AS design_variant_id, dv.image, dv.alt, COUNT(l.id) AS like_count
       FROM design_variants dv
       JOIN designs d ON dv.design_id = d.id
       LEFT JOIN likes l ON dv.id = l.design_variant_id
       GROUP BY d.id, dv.id
       HAVING COUNT(l.id) > 2
       ORDER BY d.name, like_count DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching popular designs:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

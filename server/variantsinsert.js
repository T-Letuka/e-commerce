const fs = require("fs");
const path = require("path");
const { pool } = require("./db");

const dataPath = path.join(__dirname, "data.json");

const insertDesignVariants = async () => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    const items = data.items;

    for (const item of items) {
      const designVariants = item.designs;

      for (const design of designVariants) {
        await pool.query(
          "INSERT INTO design_variants (id, design_id, image, active, alt) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING",
          [design.id, item.id, design.image, design.active, design.alt]
        );
        console.log(
          `Inserted design variant with ID: ${design.id} for design ID: ${item.id}`
        );
      }
    }

    console.log("Design variants inserted successfully.");
  } catch (error) {
    console.error("Error inserting design variants:", error);
  }
};

insertDesignVariants();
//last try :(

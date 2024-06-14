const fs = require("fs");
const path = require("path");
const { pool } = require("./db");

const dataPath = path.join(__dirname, "data.json");

const insertDesigns = async () => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    const designVariants = data.items.flatMap((item) =>
      item.designs.map((design) => ({
        design_id: item.id,
        image: design.image,
        active: design.active || false,
        alt: design.alt || `Design ${design.id}`,
      }))
    );

    // Insert design variants
    for (const variant of designVariants) {
      await pool.query(
        "INSERT INTO design_variants (design_id, image, active, alt) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING",
        [variant.design_id, variant.image, variant.active, variant.alt]
      );
      console.log(
        `Inserted design variant for design ID: ${variant.design_id}`
      );
    }

    console.log("Design variants inserted successfully.");
  } catch (error) {
    console.error("Error inserting design variants:", error);
  }
};

insertDesigns();

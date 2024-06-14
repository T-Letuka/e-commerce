const fs = require("fs");
const path = require("path");
const { pool } = require("./db");

const dataPath = path.join(__dirname, "data.json");

const insertDesigns = async () => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    const designs = data.items;

    for (const item of designs) {
      const { id, name, bgColor, imgUrl, designs: designVariants } = item;

      // Insert main design
      const designResult = await pool.query(
        "INSERT INTO designs (id, name, bg_color, image_url) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING RETURNING id",
        [id, name, bgColor, imgUrl]
      );

      const designId = designResult.rows[0] ? designResult.rows[0].id : id;
      console.log(`Inserted design with ID: ${designId}`);

      // Insert design variants
      for (const design of designVariants) {
        await pool.query(
          "INSERT INTO design_variants (id, design_id, image, active, alt) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING",
          [design.id, designId, design.image, design.active, design.alt]
        );
        console.log(
          `Inserted design variant with ID: ${design.id} for design ID: ${designId}`
        );
      }
    }

    console.log("Designs and variants inserted successfully.");
  } catch (error) {
    console.error("Error inserting designs and variants:", error);
  }
};

insertDesigns();

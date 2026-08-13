const db = require("../config/db");
const bcrypt = require("bcrypt");

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123"; // change if you use a different initial password

async function hashAdmin() {
  try {
    const saltRounds = 10;
    const hashed = await bcrypt.hash(ADMIN_PASSWORD, saltRounds);

    db.query("SELECT id, username, password FROM users WHERE username = ?", [ADMIN_USERNAME], (err, results) => {
      if (err) {
        console.error("DB error:", err);
        process.exit(1);
      }

      if (!results || results.length === 0) {
        console.error(`User '${ADMIN_USERNAME}' not found in users table.`);
        process.exit(1);
      }

      const user = results[0];

      db.query("UPDATE users SET password = ? WHERE id = ?", [hashed, user.id], (uErr) => {
        if (uErr) {
          console.error("Failed to update password:", uErr);
          process.exit(1);
        }

        console.log(`Password for '${ADMIN_USERNAME}' hashed and updated successfully.`);
        process.exit(0);
      });
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

hashAdmin();

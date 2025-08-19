require("dotenv").config();
const { connectDB } = require("../src/config/db");
const User = require("../src/models/User");

(async () => {
  try {
    await connectDB(process.env.MONGODB_URI);

    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
    }

    let admin = await User.findOne({ email: ADMIN_EMAIL });
    if (!admin) {
      admin = await User.create({
        name: ADMIN_NAME || "Admin",
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: "admin",
      });
      console.log("✅ Admin user created:", admin.email);
    } else {
      console.log("ℹ️ Admin already exists:", admin.email);
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
})();

require("dotenv").config();
const app = require("./app"); // 👈 you probably missed this line
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();

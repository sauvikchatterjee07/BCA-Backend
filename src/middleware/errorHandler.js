function notFound(req, res, next) {
  res.status(404).json({ success: false, message: "Route not found" });
}

function errorHandler(err, req, res, next) {
  console.error("❌", err);
  if (err && err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Duplicate key error",
      details: err.keyValue,
    });
  }
  const status = err.status || 500;
  res
    .status(status)
    .json({ success: false, message: err.message || "Server error" });
}

module.exports = { notFound, errorHandler };

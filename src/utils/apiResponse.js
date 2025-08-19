function success(res, data = {}, status = 200) {
  return res.status(status).json({ success: true, data });
}

function fail(res, message = "Something went wrong", status = 400, details) {
  return res.status(status).json({ success: false, message, details });
}

module.exports = { success, fail };

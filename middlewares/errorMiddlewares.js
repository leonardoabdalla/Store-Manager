const error = (err, _req, res, _next) => {
  res.status(404).json({ message: err.message });
};

module.exports = error;

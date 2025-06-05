module.exports = (req, res, next) => {
  const isAdmin = req.headers["x-admin"];
  if (isAdmin === "true") next();
  else res.status(403).json({ error: "Access denied. Admins only." });
};

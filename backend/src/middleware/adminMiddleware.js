const admin = (
  req,
  res,
  next
) => {
  if (
    req.user &&
    req.user.role === "manager"
  ) {
    return next();
  }

  return res.status(403).json({
    message:
      "Manager access only",
  });
};

module.exports = admin;
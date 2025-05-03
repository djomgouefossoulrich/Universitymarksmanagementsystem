const jwt = require('jsonwebtoken');

function authorizeRoles(...roles) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.sendStatus(403);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      if (!roles.includes(decoded.role)) return res.status(403).json({ error: 'Access denied' });
      req.user = decoded;
      next();
    });
  };
}

module.exports = { authorizeRoles };

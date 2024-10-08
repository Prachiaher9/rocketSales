const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: 'Token Not Found' });
  const token = authorization.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// const schoolAuthMiddleware = async (req, res, next) => {
//   const authorization = req.headers.authorization;
//   if (!authorization) return res.status(401).json({ error: 'Token Not Found' });
//   const token = authorization.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'Unauthorized' });
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const school = await School.findOne({ _id: decoded.id, username: decoded.username });
//     if (!school) {
//       return res.status(401).json({ error: 'Invalid token' });
//     }
//     req.school = decoded;
//     next();
//   } catch (err) {
//     console.error(err);
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };

const generateToken = (Data) => {
  return jwt.sign(Data, process.env.JWT_SECRET);
};

module.exports = { jwtAuthMiddleware,generateToken };
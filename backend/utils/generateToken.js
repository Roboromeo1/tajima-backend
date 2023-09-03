import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, "abc123", {
    expiresIn: '30d',
  });

  // Set JWT as an HTTP-Only cookie
  res.cookie('access_token', token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;

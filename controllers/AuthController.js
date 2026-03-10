import { users } from '../data/users.js';

const buildUserResponse = (user) => {
  const token = Buffer.from(`${user.username}:${Date.now()}`).toString('base64');

  return {
    username: user.username,
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    token,
    email: user.email,
  };
};

export const validate_login = (req, res) => {
  const { username, password } = req.body || {};

  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({
      message: 'Invalid payload. Expected { username: "string", password: "string" }',
    });
  }

  const normalizedUsername = username.trim();
  const normalizedPassword = password.trim();

  const matchedUser = users.find(
    (user) => user.username === normalizedUsername && user.password === normalizedPassword
  );

  if (!matchedUser) {
    return res.status(200).json({
      isAuthenticated: false,
      user: null,
    });
  }

  return res.status(200).json({
    isAuthenticated: true,
    user: buildUserResponse(matchedUser),
  });
};

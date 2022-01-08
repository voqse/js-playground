import jwt from 'jsonwebtoken';

export default function getAuthHeader(userId, option = {}) {
  const accessToken = jwt.sign({
    id: userId,
  }, process.env.SECRET, option);

  return `Bearer ${accessToken}`;
}

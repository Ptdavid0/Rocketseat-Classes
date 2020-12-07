import jwt from 'jsonwebtoken';
import { promisify } from 'util'; // callbacl -> async/await
import authConfig from '../../config/auth'; // Usar o segredo la salvo

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    //EX:{ id: 8, iat: 1583273574, exp: 1583878374 }

    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token Invalid' });
  }
};

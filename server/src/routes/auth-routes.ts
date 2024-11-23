import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body; // get user and password 

  const user = await User.findOne({
    where: { username: username },
  }); // find user in database

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  } 

  const passwordIsValid = await bcrypt.compare(password, user.password); // compare password
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Invalid Password' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || ''; // get secret key from .env file

  const token = jwt.sign({ username: user.username }, secretKey, {expiresIn: '1h'}); // create token
  return res.status(200).json({ token: token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;

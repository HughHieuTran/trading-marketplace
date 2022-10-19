import User from '../model/User.js';
import statusCodes from 'http-status-codes';

import { BadRequestError, UnauthenticatedError } from '../customError/index.js';
//-----------------------------------------------register
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError('please provide all value');
  }

  const userExisted = await User.findOne({ email });
  if (userExisted) {
    throw new BadRequestError('please provide a unique email');
  }

  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  res.status(statusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      location: user.location,
    },
    token,
    location: user.location,
  });
};
// -----------------------------------------------login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('please provide all value');
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new UnauthenticatedError(
      'Email not exist on system, register instead ?'
    );
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Password');
  }
  const token = user.createJWT();

  res.status(statusCodes.OK).json({
    user: {
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      location: user.location,
    },
    token,
    location: user.location,
  });
};
//-----------------------------------------------updateUser
const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError('Please provide all values');
  }
  const user = await User.findOne({ _id: req.user.userId });
  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const token = user.createJWT();

  res.status(statusCodes.OK).json({ user, token, location: user.location });
};

export { register, login, updateUser };

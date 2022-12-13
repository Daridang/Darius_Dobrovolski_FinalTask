import userModel from '../model/User.js'
import bcrypt from 'bcrypt'

import { validationResult } from 'express-validator'
import { findToken, generateToken, removeToken, saveToken, validateRefreshToken } from './tokenController.js';

import { UserDTO } from '../dtos/UserDTO.js'

export const register = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }

    const { email, name, password } = req.body;

    const isExist = await userModel.findOne({ email })
    if (isExist) {
      return res.status(409).send("User already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const result = await userModel.create({ email, name, passwordHash });

    const { accessToken, refreshToken } = generateToken(result._id)
    await saveToken(result._id, refreshToken)


    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true
    })
    res.status(201).json({
      accessToken,
      refreshToken,
      user: new UserDTO(result.id, result.email, result.name)
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'registration failed'
    })
  }
};

export const login = async (req, res) => {
  try {
    console.log('body: ', req.body)
    const user = await userModel.findOne({ email: req.body.email })
    if (!user) {
      return res.status(404).json({
        msg: 'User not found'
      })
    }

    const isValidPass = await bcrypt.compare(req.body.pass, user._doc.passwordHash)
    if (!isValidPass) {
      return res.status(404).json({
        msg: 'Wrong login or password'
      })
    }

    const { accessToken, refreshToken } = generateToken(user._id)
    await saveToken(user._id, refreshToken)

    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true
    })
    res.status(200).json({
      accessToken,
      refreshToken,
      user: new UserDTO(user.id, user.email, user.name)
    });

  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: 'Authorization failed'
    })
  }
};

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies
    const token = await removeToken(refreshToken)
    res.clearCookie('refreshToken')
    return res.status(200).json({ msg: 'Logged out' })
  } catch (error) {
    console.log(error)
  }
}

export const users = async (req, res) => {
  try {
    const users = await userModel.find()
    const usersDTO = users.map(user => new UserDTO(user._id, user.name, user.email))
    res.json({ usersDTO })
  } catch (error) {
    console.log(error)
  }
}

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies

    if (!refreshToken) {
      return res.status(401)
    }

    const userData = validateRefreshToken(refreshToken)
    const tokenFromDb = findToken(refreshToken)

    if (!userData || !tokenFromDb) {
      return res.status(400).json({ msg: 'Something went wrong' })
    }

    const tokens = generateToken(userData._id)
    await saveToken(userData._id, tokens.refreshToken)

    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 100, httpOnly: true
    })
    res.status(200).json({
      accessToken,
      refreshToken
    });
  } catch (error) {

  }
}

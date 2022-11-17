import { NextFunction, Request, Response } from 'express'

import user from '../services/user'

export async function register (req: Request, res: Response, next: NextFunction) {
  try {
    req.user = {
      id: await user.create(req.body.email, req.body.password),
      newUser: true
    }
    next()
  } catch (err: unknown) {
    next(err)
  }
}

export async function login (req: Request, res: Response, next: NextFunction) {
  try {
    req.user = { id: await user.checkPassword(req.body.email, req.body.password) }
    next()
  } catch (err: unknown) {
    next(err)
  }
}

export async function logout (req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'lax'
    })
    return res.status(200).send({
      success: true,
      message: 'Disconnected.'
    })
  } catch (err: unknown) {
    next(err)
  }
}

export async function logInWithGoogle (req: Request, res: Response, next: NextFunction) {
  try {
    const { id, redirection } = await user.createGoogleUser(req.body.credential)
    if (!id) {
      return res.status(302).send({
        success: false,
        message: 'Need to confirm by logging in.',
        redirection
      })
    }
    req.user = { id, redirection }

    //
    // ISSUE A JWT
    //
    next()
  } catch (err: unknown) {
    next(err)
  }
}

export default {
  register,
  login,
  logout,
  logInWithGoogle
}

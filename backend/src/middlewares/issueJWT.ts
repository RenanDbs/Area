//
// ──────────────────────────────────────────────────────────── I ──────────
//   :::::: J W T   I S S U E R : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import { NextFunction, Request, Response } from 'express'
import { SignJWT } from 'jose'

import ExpressError from '../classes/ExpressError'
import { xDays, xDaysLater } from '../misc/days'

// ─────────────────────────────────────────────────────────────────────────────

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    // ─── Check Requirements ───────────────────────────────────────

    if (!req.user?.id) throw new ExpressError(400, 'User ID missing.')

    // ─── Create A JWT ─────────────────────────────────────────────

    const jwt: string = await new SignJWT({ iss: 'AREA', aud: req.user.id.toString() })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime('30d')
      .sign(new TextEncoder().encode(String(process.env.JWT_SECRET)))

    // ─── Add The JWT To A Cookie ──────────────────────────────────

    if (req.device.type === 'desktop') {
      res.cookie('jwt', jwt, {
        expires: xDaysLater(30),
        httpOnly: true,
        maxAge: xDays(30),
        sameSite: 'lax'
      })
    }

    // ─── Respond ──────────────────────────────────────────────────

    if (req.user.redirection) {
      res.redirect(req.user.redirection)
      return
    }
    res.status(req.user.newUser ? 201 : 200).send({
      success: true,
      needLogin: false,
      jwt: req.device.type !== 'desktop' ? jwt : undefined
    })

    // ──────────────────────────────────────────────────────────────
  } catch (err: unknown) {
    next(err)
  }
}

// ─────────────────────────────────────────────────────────────────────────────

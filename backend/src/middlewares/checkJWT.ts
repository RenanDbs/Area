//
// ────────────────────────────────────────────────────────────── II ──────────
//   :::::: J W T   C H E C K E R : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import { NextFunction, Request, Response } from 'express'
import { jwtVerify } from 'jose'
import { Types } from 'mongoose'
import ExpressError from '../classes/ExpressError'

// ─────────────────────────────────────────────────────────────────────────────

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // ─── Verify The Jwt ───────────────────────────────────────────

    const decodedJWT = await jwtVerify(
      req.cookies.jwt,
      new TextEncoder().encode(String(process.env.JWT_SECRET))
    )

    // ─── Enrich The Request Object With The User Id ───────────────

    req.user = { id: new Types.ObjectId(decodedJWT.payload.aud as string) }

    // ─── Continue ─────────────────────────────────────────────────

    next()

    // ──────────────────────────────────────────────────────────────
  } catch (err: unknown) {
    next(new ExpressError(401, 'Failed to verify the JWT.'))
  }
}

// ─────────────────────────────────────────────────────────────────────────────

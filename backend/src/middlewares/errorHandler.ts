//
// ────────────────────────────────────────────────────────────────── I ──────────
//   :::::: E R R O R   H A N D L E R : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import { NextFunction, Request, Response } from 'express'

import ExpressError from '../classes/ExpressError'

// ─────────────────────────────────────────────────────────────────────────────

export default (err: ExpressError, req: Request, res: Response, next: NextFunction): void => {
  // ─── Use Default Status Message If No Custom Message Is Provided ─────────────

  if (res.headersSent) next(err)
  console.error(err.message)
  if (!err.statusMessage) {
    res.sendStatus(err.statusCode || 500)
    return
  }

  // ─── Set The HTTP Response Status Code ───────────────────────────────────────

  res.status(err.statusCode)

  // ─── Send Error With Message ─────────────────────────────────────────────────

  res.send({
    success: false,
    message: err.statusMessage
  })
}

// ─────────────────────────────────────────────────────────────────────────────

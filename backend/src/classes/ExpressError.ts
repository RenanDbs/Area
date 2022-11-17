//
// ──────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: C U S T O M   E R R O R   C L A S S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import { ValidationError } from 'express-validator'

// ─────────────────────────────────────────────────────────────────────────────

export default class ExpressError extends Error {
  // ─── HTTP Response Status Code ───────────────────────────────────────────────

  statusCode: number

  // ─── Message Descibing The Error ─────────────────────────────────────────────

  statusMessage?: string | ValidationError[]

  constructor (statusCode: number = 500, statusMessage?: string | ValidationError[], errorMessage?: string) {
    if (errorMessage) super(errorMessage)
    else super()
    this.statusCode = statusCode
    if (statusMessage) this.statusMessage = statusMessage
  }
}

// ─────────────────────────────────────────────────────────────────────────────

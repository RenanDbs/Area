import ExpressError from '../classes/ExpressError'
import { Meta } from 'express-validator'

export function checkGoogleCSRFTokens (value: any, { req }: Meta): Boolean {
  if (req.cookies?.g_csrf_token !== req.body.g_csrf_token) {
    throw new ExpressError(
      400,
      'Failed to verify double submit cookie.',
      'Failed to verify double submit cookie.'
    )
  }
  return true
}

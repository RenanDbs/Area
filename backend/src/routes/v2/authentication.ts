//
// ────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A U T H E N T I C A T I O N   R E L A T E D   R O U T E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import { Router } from 'express'
import { body, cookie } from 'express-validator'

// import ExpressError from '../../classes/ExpressError'
import { login, logout, register, logInWithGoogle } from '../../controllers/authentication'
import validate from '../../middlewares/validate'
import issueJWT from '../../middlewares/issueJWT'
import { checkGoogleCSRFTokens } from '../../validators/checkGoogleCSRFTokens'

// ─────────────────────────────────────────────────────────────────────────────

export default Router()
// ─── Registration ────────────────────────────────────────────────────────────

  .post('/register',

    // ─── Request Validation ───────────────────────────────────────

    body('email').isEmail().withMessage('Invalid email.'),
    body('password').isStrongPassword(),
    validate,

    // ─── Register The User ───────────────────────────────────────

    register,

    // ─── Issue A Jwt ─────────────────────────────────────────────

    issueJWT
  )

// ─── Login ───────────────────────────────────────────────────────────────────

  .post('/login',
    body('email').isEmail().withMessage('Invalid email.'),
    body('password').isString(),
    validate,
    login,
    issueJWT)

// ─── Sign In With Google Callback ────────────────────────────────────────────

  .post('/google',
    cookie('g_csrf_token').isString().withMessage('No CSRF token in Cookie.'),
    body('g_csrf_token').isString().withMessage('No CSRF token in post body.')
      .custom(checkGoogleCSRFTokens),
    validate,
    logInWithGoogle,
    issueJWT)

  .post('/logout', logout)

// ─────────────────────────────────────────────────────────────────────────────

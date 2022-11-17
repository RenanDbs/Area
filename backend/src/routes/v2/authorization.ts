import { Request, Response, Router } from 'express'

import github from '../../controllers/authorization/github'
import gmail from '../../controllers/authorization/gmail'
import googleCalendar from '../../controllers/authorization/googleCalendar'
import googleSheets from '../../controllers/authorization/googleSheets'
import googleDrive from '../../controllers/authorization/googleDrive'
import c from '../../controllers/controllerHandler'
import checkJWT from '../../middlewares/checkJWT'
import { cookie, query } from 'express-validator'
import validate from '../../middlewares/validate'
import ExpressError from '../../classes/ExpressError'

export default Router()

  .use(checkJWT)

  .get(
    '/github',
    cookie('state').isString(),
    query('state').custom((value, { req }) => {
      if (value !== req.cookies?.state) throw new ExpressError(500, 'Failed to verify state.', 'Failed to verify state.')
      return true
    }),
    validate,
    github.callback
  )
  .post('/github', c(github.authorize, (req: Request, res: Response) => [res]))
  .delete('/github', c(github.revoke, (req: Request, res: Response) => [req.user?.id]))

  .get(
    '/google_drive',
    query('code').isString(),
    validate,
    googleDrive.callback
  )
  .post('/google_drive', c(googleDrive.authorize, (req: Request, res: Response) => [req.user?.id]))
  .delete('/google_drive', c(googleDrive.revoke, (req: Request, res: Response) => [req.user?.id]))

  .get(
    '/google_sheets',
    query('code').isString(),
    validate,
    googleSheets.callback
  )
  .post('/google_sheets', c(googleSheets.authorize, (req: Request, res: Response) => [req.user?.id]))
  .delete('/google_sheets', c(googleSheets.revoke, (req: Request, res: Response) => [req.user?.id]))

  .get('/google_calendar',
    query('code').isString(),
    validate,
    googleCalendar.callback)
  .post('/google_calendar', c(googleCalendar.authorize, (req: Request, res: Response) => [req.user?.id]))
  .delete('/google_calendar', c(googleCalendar.revoke, (req: Request, res: Response) => [req.user?.id]))

  .get(
    '/gmail',
    query('code').isString(),
    validate,
    gmail.callback)
  .post('/gmail', c(gmail.authorize, (req: Request, res: Response) => [req.user?.id]))
  .delete('/gmail', c(gmail.revoke, (req: Request, res: Response) => [req.user?.id]))

import { Request, Response, NextFunction } from 'express'
import { Result, ValidationError, validationResult } from 'express-validator'
import ExpressError from '../classes/ExpressError'

export default (req: Request, res: Response, next: NextFunction) => {
  const errors: Result<ValidationError> = validationResult(req)

  if (!errors.isEmpty()) throw new ExpressError(400, errors.array())
  next()
}

import { NextFunction, Request, Response } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  return res.send({
    success: true,
    status: {
      nbOfRunningArea: req.app.get('nbOfArea'),
      runningAreas: req.app.get('areas')
    }
  })
}

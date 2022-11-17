import { NextFunction, Request, Response } from 'express'

export default (controller: Function, params?: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (params) {
        return res.send(await controller(...params(req, res)))
      } else {
        return res.send(await controller())
      }
    } catch (err:unknown) {
      next(err)
    }
  }

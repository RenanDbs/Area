import { Request, Response, Router } from 'express'
import { param } from 'express-validator'

import c from '../../controllers/controllerHandler'
import { getAuthorizedServices, getServiceByID, getServices } from '../../controllers/services'
import checkJWT from '../../middlewares/checkJWT'

export default Router()
  .use(checkJWT)

  .get('/', c(getServices, (req: Request, res: Response) => [req.query.projection]))
  .get('/authorized', c(getAuthorizedServices, (req: Request, res: Response) => [req.user?.id]))
  .get('/:_id',
    param('_id').isMongoId(),
    c(getServiceByID, (req: Request, res: Response) => [req.params._id, req.query.projection]))

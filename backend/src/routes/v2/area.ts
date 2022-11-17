//
// ──────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A R E A S   R E L A T E D   R O U T E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import { Router, NextFunction, Request, Response } from 'express'
import { body, param } from 'express-validator'

import checkJWT from '../../middlewares/checkJWT'
import isAREA from '../../validators/isAREA'
import c from '../../controllers/controllerHandler'
import { deleteArea, getArea, postArea, putArea } from '../../controllers/area'
import validate from '../../middlewares/validate'
import { pushArea, removeArea } from '../../middlewares/area'
// ─────────────────────────────────────────────────────────────────────────────

export default Router()
  .use(checkJWT)

// ─── List All AREAs Of A User ────────────────────────────────────────────────

  .get('/', c(
    getArea,
    (req: Request, res: Response, next: NextFunction) => [req.user?.id])
  )

// ─── Create A New AREA ───────────────────────────────────────────────────────

  .post('/',

    // ─── Request Validation ───────────────────────────────────────

    body('area').custom(isAREA),
    validate,

    // ─────────────────────────────────────────────────────────────

    pushArea,

    c(
      postArea,
      (req: Request, res: Response, next: NextFunction) => [req.user?.id, req.body.area]
    )
  )

// ─── Update An Area ──────────────────────────────────────────────────────────

  .put('/:id',

    // ─── Request Validation ───────────────────────────────────────

    param('id').isMongoId(),
    body('area').custom(isAREA),
    validate,
    // updateArea,

    // ─── Update An AREA ──────────────────────────────────────────

    c(
      putArea,
      (req: Request, res: Response, next: NextFunction) => [req.user?.id, req.params.id, req.body.area]
    )

    // ──────────────────────────────────────────────────────────────
  )

// ─── Delete An Area ──────────────────────────────────────────────────────────

  .delete('/:id',

    // ─── Request Validation ───────────────────────────────────────

    param('id').isMongoId(),
    validate,

    // ──────────────────────────────────────────────────────────────
    removeArea,
    c(
      deleteArea,
      (req: Request, res: Response, next: NextFunction) => [req.user?.id, req.params.id]
    )
  )

// ─────────────────────────────────────────────────────────────────────────────

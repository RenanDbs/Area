import { NextFunction, Request, Response } from 'express'
import IArea from '../interfaces/IArea'
import actions from '../misc/actions'
import { Types } from 'mongoose'
import reactions from '../misc/reactions'

export function pushArea (req: Request, res: Response, next: NextFunction) {
  const newArea: IArea = req.body.area
  if (req.user?.id) newArea.userID = req.user.id
  newArea._id = new Types.ObjectId()
  req.body.area._id = newArea._id
  newArea.action.locals = {}
  newArea.action.service = actions[newArea.action.id as keyof typeof actions]
  newArea.reaction.service = reactions[newArea.reaction.id as keyof typeof reactions]
  const areas: IArea[] = req.app.get('areas')

  const nbOfAreaRunning: number = areas.push(newArea)

  req.app.set(
    'areas',
    areas
  )
  req.app.set(
    'nbOfArea',
    nbOfAreaRunning
  )
  next()
}

export function removeArea (req: Request, res: Response, next: NextFunction) {
  const areaArray = res.app.get('areas')
  const updatedAreaArray = []

  for (let i = 0; i < areaArray.length; i++) {
    if (areaArray[i]._id.toString() !== req.params.id) updatedAreaArray.push(areaArray[i])
  }
  res.app.set(
    'nbOfArea',
    updatedAreaArray.length
  )
  res.app.set(
    'areas',
    updatedAreaArray
  )
  next()
}

export default {
  pushArea,
  removeArea
}

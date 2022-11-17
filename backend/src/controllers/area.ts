import { Types } from 'mongoose'

import ExpressError from '../classes/ExpressError'
import IArea from '../interfaces/IArea'
import User from '../models/User'
import action from '../services/action'
import reaction from '../services/reaction'

export async function getArea (userID: Types.ObjectId) {
  const user = await User.findById(userID, 'areas')
  if (!user) throw new ExpressError(500, 'User not found.')
  const listArea = []

  for (const area of user.areas) {
    listArea.push({
      id: area._id,
      action: {
        service: await action.getServiceName(area.action.id.toString()),
        name: await action.getName(area.action.id.toString())
      },
      reaction: {
        service: await reaction.getServiceName(area.reaction.id.toString()),
        name: await reaction.getName(area.reaction.id.toString())
      }
    })
  }
  return {
    success: true,
    listArea
  }
}

export async function postArea (userID: Types.ObjectId, area: IArea) {
  const user = await User.findById(userID, 'areas')
  if (!user) throw new ExpressError(500, 'User not found.')

  //
  // CREATE AREA
  //
  const newArea = user.areas.create(area)
  user.areas.push(newArea)
  await user.save()

  // • • • • •

  return {
    success: true,
    message: 'AREA created.'
  }
}

export async function putArea (userID: Types.ObjectId, areaID: Types.ObjectId, updateArea: IArea) {
  const user = await User.findById(userID, 'areas')
  if (!user) throw new ExpressError(500, 'User not found.')

  //
  // CREATE AREA
  //
  const area = user.areas.id(areaID)
  if (!area) throw new ExpressError(400, 'AREA not found.')
  Object.assign(area, updateArea)
  await user.save()

  // • • • • •

  return {
    success: true,
    message: 'AREA updated.'
  }
}

export async function deleteArea (userID: Types.ObjectId, areaID: Types.ObjectId) {
  const user = await User.findById(userID)
  if (!user) throw new ExpressError(500, 'User not found.')

  //
  // REMOVE AREA
  //
  if (!user.areas.id(areaID)) throw new ExpressError(404)
  user.areas.id(areaID)?.remove()
  await user.save()
  return {
    sucess: true,
    message: 'AREA removed.'
  }
}

export default {
  getArea,
  postArea,
  putArea,
  deleteArea
}

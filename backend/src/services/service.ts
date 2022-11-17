import { Types } from 'mongoose'
import ExpressError from '../classes/ExpressError'
import Service from '../models/Service'

export async function getServiceByID (serviceID: Types.ObjectId) {
  const service = await Service.findById(serviceID)
  if (!service) throw new ExpressError(400, 'Invalid service.', 'Invalid Service.')
  return service
}

export default { get: getServiceByID }

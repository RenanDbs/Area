import ExpressError from '../classes/ExpressError'
import Service from '../models/Service'

export async function getServiceName (reactionID: string): Promise<string> {
  const services = await Service.find({})
  if (!services) throw new ExpressError(500, 'No services.')

  for (let i: number = 0; i < services.length; i++) {
    for (let j = 0; j < services[i].reactions.length; j++) {
      if (services[i].reactions[j]._id.toString() === reactionID) return services[i].name
    }
  }
  throw new ExpressError(500, 'Service not found.')
}

export async function getName (reactionID: string) {
  const services = await Service.find({})
  if (!services) throw new ExpressError(500, 'No services.')
  for (let i: number = 0; i < services.length; i++) {
    for (let j = 0; j < services[i].reactions.length; j++) {
      if (services[i].reactions[j]._id.toString() === reactionID) return services[i].reactions[j].name
    }
  }
  throw new ExpressError(500, 'Service not found.')
}

export default {
  getServiceName,
  getName
}

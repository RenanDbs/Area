import ExpressError from '../classes/ExpressError'
import Service from '../models/Service'

export async function getServiceName (actionID: string): Promise<string> {
  const services = await Service.find({})
  if (!services) throw new ExpressError(500, 'No services.')

  for (let i: number = 0; i < services.length; i++) {
    for (let j = 0; j < services[i].actions.length; j++) {
      if (services[i].actions[j]._id.toString() === actionID) return services[i].name
    }
  }
  throw new ExpressError(500, 'Service not found.')
}

export async function getName (actionID: string) {
  const services = await Service.find({})
  if (!services) throw new ExpressError(500, 'No services.')
  for (let i: number = 0; i < services.length; i++) {
    for (let j = 0; j < services[i].actions.length; j++) {
      if (services[i].actions[j]._id.toString() === actionID) return services[i].actions[j].name
    }
  }
  throw new ExpressError(500, 'Service not found.')
}

export default {
  getServiceName,
  getName
}

import Service from '../models/Service'
import User from '../models/User'

export async function getServices (projection?: string) {
  const services = await Service.find({}, projection)

  return {
    success: true,
    services: services || []
  }
}

export async function getAuthorizedServices (userID: string) {
  const authorizedServicesQuery = await User.findById(userID, 'tokens.service')
  const authorizedServices: string[] | undefined = authorizedServicesQuery?.tokens.map(service => service.service)

  return {
    success: true,
    authorizedServices
  }
}

export async function getServiceByID (serviceID: string, projection?: string) {
  const details = await Service.findById(serviceID, projection)

  return {
    success: true,
    service: details
  }
}

export default { getServices, getServiceByID, getAuthorizedServices }

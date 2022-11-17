import Service from '../models/Service'
import { NetworkInterfaceInfo, networkInterfaces } from 'os'

export default async (host: string) => {
  const services = await Service.find({})

  if (host === "::1") {
    const ip = Object.values(networkInterfaces())
    .flat()
    .find((i: NetworkInterfaceInfo | undefined): Boolean => {
      if (i === undefined) return false
      return i.family === 'IPv4' && !i.internal
    })
    ?.address
    if (ip === undefined) throw new Error('Cannot retrieve the local IP of this machine.')
    host = ip
  }

  return {
      "client": {
        host
      },
      "server": {
        "current_time": Math.floor(Date.now() / 1000),
        services
      }
    }
}

import { Router } from 'express'

import status from '../../middlewares/status'
import areaRouter from './area'
import authRouter from './authentication'
import authorizationRouter from './authorization'
import servicesRouter from './services'

export default Router()
  .use('/auth', authRouter)
  .use('/authorize', authorizationRouter)
  .use('/services', servicesRouter)
  .use('/area', areaRouter)
  .get('/status', status)

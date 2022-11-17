//
// ──────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A R E A   B A C K E N D   E N T R Y   P O I N T : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────
//
import { debug } from 'console'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
import express, { Application, NextFunction, Request, Response } from 'express'
import device from 'express-device'
import { connect } from 'mongoose'

import c from './controllers/controllerHandler'
import errorHandler from './middlewares/errorHandler'
import routerV2 from './routes/v2/router'
import checkActions from './services/checkActions'
import { restoreAreas } from './services/restoreAreas'
import about from './controllers/about'

// ─── Imports ─────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────

dotenv.config()

async function main (): Promise<void> {
  const app: Application = express()
  const port: number = Number(process.env.PORT)

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(cors({ origin: String(process.env.FRONTEND_HOST), credentials: true }))
  app.use(device.capture())

  // ─── Connection To The Database ──────────────────────────────────────────────

  await connect(String(process.env.CONNECTION_STRING))
  console.log('Successfully connected to the DB')

  // ─── Restore Areas ───────────────────────────────────────────────────

  app.set('areas', await restoreAreas())
  app.set('nbOfArea', (await restoreAreas()).length)
  const intervalID = setInterval(checkActions, 10000, app)

  // ─── Router ──────────────────────────────────────────────────────────────────

  app.use('/v2', routerV2)
  app.get('/about.json', c(about, (req: Request, res: Response, next: NextFunction) => [req.ip]))

  // ─── Error Handler ───────────────────────────────────────────────────────────

  app.use(errorHandler)

  // ─── Start The Server ────────────────────────────────────────────────────────

  const server = app.listen(port, (): void => {
    console.log('Backend listening on port:', port)
  })

  // ─── Graceful Shutdown ───────────────────────────────────────────────────────

  process.on('SIGTERM', () => {
    debug('SIGTERM signal received: closing HTTP server.')
    clearInterval(intervalID)
    server.close(() => {
      debug('HTTP sever closed.')
    })
  })

  // ─────────────────────────────────────────────────────────────────────────────
}

// ─── Call To The Main Function ───────────────────────────────────────────────

try {
  main()
} catch (err: unknown) {
  console.error(err)
}

// ─────────────────────────────────────────────────────────────────────────────

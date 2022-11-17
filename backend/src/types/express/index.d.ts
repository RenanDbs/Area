/* eslint no-unused-vars: "off" */

import { Types } from 'mongoose'
import IArea from '../../interfaces/IArea'

declare global {
    namespace Express {
        export interface Request {
            user?: {
                id: Types.ObjectId,
                newUser?: Boolean,
                redirection?: string
            },
            device: {
                  type: string,
                  name: string
            }
        }
    }
}

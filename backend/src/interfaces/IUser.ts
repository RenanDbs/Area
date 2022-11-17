//
// ──────────────────────────────────────────────────────────────────── I ──────────
//   :::::: U S E R   I N T E R F A C E : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import { Types } from 'mongoose'

import IArea from './IArea'
import ITokens from './ITokens'

// ─────────────────────────────────────────────────────────────────────────────

export default interface IUser {
  readonly _id: Types.ObjectId
  email: string
  password?: string
  readonly googleUID?: string
  isLoggedInWithGoogle: boolean
  tokens: ITokens[]
  areas: IArea[]
}

// ─────────────────────────────────────────────────────────────────────────────

//
// ──────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: T O K E N S   I N T E R F A C E : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import { Types } from 'mongoose'

// ─────────────────────────────────────────────────────────────────────────────

export default interface ITokens {
  _id: Types.ObjectId
  service: string
  accessToken: string
  refreshToken?: string
}

// ─────────────────────────────────────────────────────────────────────────────

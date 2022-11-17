//
// ────────────────────────────────────────────────────────────── I ──────────
//   :::::: U S E R   S C H E M A : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import { Model, model, Schema, Types } from 'mongoose'

import IArea from '../interfaces/IArea'
import ITokens from '../interfaces/ITokens'
import IUser from '../interfaces/IUser'

// ─────────────────────────────────────────────────────────────────────────────

const Tokens: Schema<ITokens> = new Schema<ITokens>({
  service: { type: String },
  accessToken: { type: String, required: true },
  refreshToken: { type: String }
})

const Area: Schema<IArea> = new Schema({
  action: {
    id: { type: Types.ObjectId, required: true },
    params: { type: Object, required: true }
  },
  reaction: {
    id: { type: Types.ObjectId, required: true },
    params: { type: Object, required: true }
  }
})

// TMethodsAndOverrides
type UserDocumentProps = {
  tokens: Types.DocumentArray<ITokens>
  areas: Types.DocumentArray<IArea>
}
type UserModelType = Model<IUser, {}, UserDocumentProps>

const User: Schema<IUser, UserModelType> = new Schema<IUser, UserModelType>({
  email: { type: String, required: true, unique: true },
  password: String,
  googleUID: String,
  isLoggedInWithGoogle: { type: Boolean, required: true, default: false },
  tokens: [Tokens],
  areas: [Area]
})

export default model<IUser, UserModelType>('User', User)

// ─────────────────────────────────────────────────────────────────────────────

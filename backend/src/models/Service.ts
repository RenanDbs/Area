//
// ──────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: S E R V I C E   M O D E L   A N D   S C H E M A : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import { Model, model, Schema, Types } from 'mongoose'
import IService, { IAction, IReaction, IParam } from '../interfaces/IService'

// ─────────────────────────────────────────────────────────────────────────────

const Param: Schema<IParam> = new Schema<IParam>({
  name: String,
  description: String,
  type: String
})

// TMethodsAndOverrides
type ActionReactionDocumentProps = {
  params: Types.DocumentArray<IParam>
}
type ActionReactionModelType = Model<IParam, {}, ActionReactionDocumentProps>

type ServiceDocumentProps = {
  actions: Types.DocumentArray<IAction>
  reactions: Types.DocumentArray<IReaction>
}
type ServiceModelType = Model<IService, {}, ServiceDocumentProps>

// ─── Action/Reaction Schema ──────────────────────────────────────────────────

const ActionReaction: Schema<IAction, ActionReactionModelType> = new Schema<IAction, ActionReactionModelType>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  params: [Param]
})

const Service: Schema<IService, ServiceModelType> = new Schema<IService, ServiceModelType>({
  name: { type: String, required: true },
  actions: [ActionReaction],
  reactions: [ActionReaction]
})

export default model<IService, ServiceModelType>('Service', Service)

// ─────────────────────────────────────────────────────────────────────────────

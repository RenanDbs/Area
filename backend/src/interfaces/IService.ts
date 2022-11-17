//
// ────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: S E R V I C E   I N T E R F A C E : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import { Types } from 'mongoose'

// ─────────────────────────────────────────────────────────────────────────────

// ─── Parameter Interface ─────────────────────────────────────────────────────

export interface IParam {
    name: string
    description: string
    type: string
}

// ─── Action Interface ────────────────────────────────────────────────────────

export interface IAction {
    _id: Types.ObjectId
    name: string
    description: string
    params: IParam[]
}

// ─── Reaction Interface ──────────────────────────────────────────────────────

export interface IReaction {
    _id: Types.ObjectId
    name: string
    description: string,
    params: IParam[]
}

export default interface IService {
    name: string
    actions: IAction[]
    reactions: IReaction[]
}

// ─────────────────────────────────────────────────────────────────────────────

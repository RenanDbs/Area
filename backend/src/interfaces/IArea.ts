//
// ────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A R E A   I N T E R F A C E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────
//

import { Types } from 'mongoose'

// ─── AREA Interface ──────────────────────────────────────────────────────────

export default interface IArea {
    _id: Types.ObjectId
    userID: Types.ObjectId
    action: {
        id: string
        params: any
        service: Function
        locals: any
    },
    reaction: {
        id: string,
        service: Function
        params: any
    }
}

// ─────────────────────────────────────────────────────────────────────────────

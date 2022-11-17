import IArea from '../interfaces/IArea'
import actions from '../misc/actions'
import reactions from '../misc/reactions'
import User from '../models/User'

// ─── Get All Areas Stored In The DB ──────────────────────────────────────────

export async function restoreAreas () {
  const user = await User.find({}, 'areas')
  const areasArray: IArea[] = []

  for (let i = 0; i < user.length; i++) {
    for (let j = 0; j < user[i].areas.length; j++) {
      const area: IArea = user[i].areas[j]
      area.userID = user[i]._id
      area.action.locals = {}
      area.action.service = actions[area.action.id as keyof typeof actions]
      area.reaction.service = reactions[area.reaction.id as keyof typeof reactions]
      areasArray.push(area)
    }
  }
  return areasArray
}

//
// ────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A R E A   V A L I D A T O R S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import ExpressError from '../classes/ExpressError'
import IArea from '../interfaces/IArea'
import { IAction, IParam } from '../interfaces/IService'
import Service from '../models/Service'

// ─────────────────────────────────────────────────────────────────────────────

function checkParameterTypes (reference: IParam[], obj: Object) {
  // baser la comparaison sur la reference et non l'objet
  for (const [key, value] of Object.entries(obj)) { // abscence des parametres non checkee
    const param = reference.find(param => key === param.name)
    if (!param) throw new ExpressError(400, 'Invalid parameter.', 'Invalid parameter.')
    // eslint-disable-next-line valid-typeof
    if (typeof value !== param.type) throw new ExpressError(400, key + 'has invalid type.', key + 'has invalid type.')
  }
}

export default async (area: IArea): Promise<Boolean> => {
  // ─── Check Action ────────────────────────────────────────────────────

  let response = await Service.findOne({ 'actions._id': area.action.id })
  if (!response) throw new ExpressError(400, 'Invalid action.', 'Invalid action.')

  let reference = response.actions.find((action: IAction) => (action._id.toString() === area.action.id))
  if (!reference) throw new ExpressError(500, 'Action not found.', 'Action not found.')

  checkParameterTypes(reference.params, area.action.params)

  // ─── Check Reaction ──────────────────────────────────────────────────

  response = await Service.findOne({ 'reactions._id': area.reaction.id })
  if (!response) throw new ExpressError(400, 'Invalid reaction.', 'Invalid reaction.')

  reference = response.reactions.find((reaction) => reaction._id.toString() === area.reaction.id)
  if (!reference) throw new ExpressError(500, 'Reaction not found.', 'Reaction not found.')

  checkParameterTypes(reference.params, area.reaction.params)

  // ─────────────────────────────────────────────────────────────────────

  return true
}

// ─────────────────────────────────────────────────────────────────────────────

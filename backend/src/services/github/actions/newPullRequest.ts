import { Octokit } from 'octokit'
import IArea from '../../../interfaces/IArea'
import user from '../../user'

export default async (area: IArea) => {
  const octokit: Octokit = new Octokit({ auth: await user.getAccessToken(area.userID, 'github') })
  const currentPR = await octokit.rest.pulls.list(area.action.params as { owner: string, repo: string })

  if (!area.action.locals.lastPR) {
    area.action.locals.lastPR = currentPR
  }
  if (currentPR !== area.action.locals.lastPR) {
    console.log('NEW PULL REQUEST!!!')
    area.action.locals.lastPR = currentPR
    await area.reaction.service(area)
  }
}

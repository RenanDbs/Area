import { Octokit } from 'octokit'
import IArea from '../../../interfaces/IArea'
import user from '../../user'

export default async (area: IArea) => {
  const octokit: Octokit = new Octokit({ auth: await user.getAccessToken(area.userID, 'github') })
  const currentHash = (await octokit.rest.repos.listCommits(area.action.params as { owner: string, repo: string })).data[0].sha

  if (!area.action.locals.lastHash) {
    area.action.locals.lastHash = currentHash
  }
  if (currentHash !== area.action.locals.lastHash) {
    console.log('COMMIT HAPPENED!!!')
    area.action.locals.lastHash = currentHash
    await area.reaction.service(area)
  }
}

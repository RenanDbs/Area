import { Octokit } from 'octokit'
import IArea from '../../../interfaces/IArea'
import user from '../../user'

export default async (area: IArea) => {
  const octokit: Octokit = new Octokit({ auth: await user.getAccessToken(area.userID, 'github') })
  const currentIssue = (await octokit.rest.issues.listForRepo(area.action.params as { owner: string, repo: string })).data[0].number

  if (!area.action.locals.lastIssue) {
    area.action.locals.lastIssue = currentIssue
  }
  if (Number(currentIssue) > Number(area.action.locals.lastIssue)) {
    console.log('NEW ISSUE CREATED!!!')
    area.action.locals.lastIssue = currentIssue

    await area.reaction.service(area)
  }
}

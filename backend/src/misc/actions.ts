import github from '../services/github/githubServices'
import gmailServices from '../services/gmail/gmailServices'

export default {
  '63704a2a3956c97ba48c1ac3': github.actions.newPush,
  '637071553956c97ba48c1ad0': github.actions.newIssueAssigned,
  '63708cda3956c97ba48c1ad9': github.actions.newPullRequest,
  '63716a57feedeee6369fb6d1': gmailServices.actions.eMailReceived
}

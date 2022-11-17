import newIssueAssigned from './actions/newIssueAssigned'
import newPullRequest from './actions/newPullRequest'
import newPush from './actions/newPush'

export default {
  actions: {
    newPush,
    newIssueAssigned,
    newPullRequest
  }
}

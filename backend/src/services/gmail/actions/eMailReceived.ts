import IArea from '../../../interfaces/IArea'
import user from '../../user'
import { gmailClient } from '../../../misc/oauth2Clients'
import { google } from 'googleapis'
import ExpressError from '../../../classes/ExpressError'

export default async (area: IArea) => {
  gmailClient.setCredentials({
    refresh_token: await user.getRefreshToken(area.userID, 'gmail')
  })
  const gmail = google.gmail({
    version: 'v1',
    auth: gmailClient
  })

  const messages = await (await gmail.users.messages.list({ userId: 'me' })).data.messages
  if (!messages) throw new ExpressError(500, 'Empty mailbox')
  console.log(messages[0].id)
  if (!area.action.locals.lastEMail) {
    area.action.locals.lastEMail = messages
  }
  if (messages !== area.action.locals.lastEMail) {
    console.log('CHANGE IN MAILBOX!!!')
    area.action.locals.lastEMail = messages
    await area.reaction.service(area)
  }
}

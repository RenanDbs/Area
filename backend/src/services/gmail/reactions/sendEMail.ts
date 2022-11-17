import { google } from 'googleapis'
import IArea from '../../../interfaces/IArea'
import { gmailClient } from '../../../misc/oauth2Clients'
import user from '../../user'
import { createMimeMessage } from 'mimetext'

export default async (area: IArea) => {
  gmailClient.setCredentials({ refresh_token: await user.getRefreshToken(area.userID, 'gmail') })
  const gmail = google.gmail({
    version: 'v1',
    auth: gmailClient
  })
  const msg = createMimeMessage()
  msg.setSender({ addr: area.reaction.params.from })
  msg.setRecipient(area.reaction.params.to)
  msg.setSubject(area.reaction.params.subject)
  msg.setMessage('text/plain', area.reaction.params.message)

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: Buffer.from(msg.asRaw()).toString('base64')
    }
  })
}

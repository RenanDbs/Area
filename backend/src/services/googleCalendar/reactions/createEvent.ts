import { google } from 'googleapis'

import IArea from '../../../interfaces/IArea'
import { googleCalendarClient } from '../../../misc/oauth2Clients'
import user from '../../user'

export default async (area: IArea) => {
  googleCalendarClient.setCredentials({ refresh_token: await user.getRefreshToken(area.userID, 'google_calendar') })
  const calendar = google.calendar({
    version: 'v3',
    auth: googleCalendarClient
  })
  calendar.events.insert({
    calendarId: 'primary',
    requestBody: {
      end: {
        dateTime: area.reaction.params.end
      },
      start: {
        dateTime: area.reaction.params.start
      },
      summary: area.reaction.params.title
    }
  })
}

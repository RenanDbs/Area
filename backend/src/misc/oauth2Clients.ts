import { OAuth2Client } from 'google-auth-library'
import { google } from 'googleapis'
import googleSecrets from '../../secrets/client_secret.json'

export const gmailClient: OAuth2Client = new google.auth.OAuth2(
  googleSecrets.web.client_id,
  googleSecrets.web.client_secret,
  googleSecrets.web.redirect_uris[2]
)

export const googleCalendarClient: OAuth2Client = new google.auth.OAuth2(
  googleSecrets.web.client_id,
  googleSecrets.web.client_secret,
  googleSecrets.web.redirect_uris[3]
)

export const googleDriveClient: OAuth2Client = new google.auth.OAuth2(
  googleSecrets.web.client_id,
  googleSecrets.web.client_secret,
  googleSecrets.web.redirect_uris[4]
)

export const googleSheetsClient: OAuth2Client = new google.auth.OAuth2(
  googleSecrets.web.client_id,
  googleSecrets.web.client_secret,
  googleSecrets.web.redirect_uris[5]
)

export default {
  gmail: gmailClient,
  googleCalendar: googleCalendarClient,
  googleDrive: googleDriveClient,
  googleSheets: googleSheetsClient
}

import { gmailClient } from '../../misc/oauth2Clients'
import User from '../../models/User'
import ExpressError from '../../classes/ExpressError'
import axios, { AxiosResponse } from 'axios'
import ITokens from '../../interfaces/ITokens'
import { Request, Response, NextFunction } from 'express'

export default {
  authorize: async (userID: string) => {
  // ─── Generate Authorization URL ───────────────────────────────

    const scopes: Array<string> = [
      'https://mail.google.com/'
    ]
    const authorizationURL: string = gmailClient.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      include_granted_scopes: true,
      login_hint: (await User.findById(userID))?.email
    })

    // ─── Send Authorization URL To The Client ─────────────────────

    return ({
      success: true,
      authorizationURL
    })

  // ──────────────────────────────────────────────────────────────
  },

  revoke: async (userID: string) => {
    // ─── Get Tokens From The DB ───────────────────────────────────

    const user = await User.findById(userID, 'tokens')
    if (!user) throw new ExpressError(409, 'User not found.')

    const gmailTokens: ITokens | undefined = user.tokens.find(tokens => tokens.service === 'gmail')
    if (!gmailTokens) throw new ExpressError(409, 'No Gmail tokens stored.')

    // ─── Revoke The Access Token ──────────────────────────────────

    const response: AxiosResponse = await axios.post('https://oauth2.googleapis.com/revoke', new URLSearchParams({ token: gmailTokens.accessToken }))

    if (response.status !== 200) throw new ExpressError(500, 'Failed to revoke tokens.')

    // ─── Remove Tokens From The DB ────────────────────────────────

    const tokens = user.tokens.id(gmailTokens._id)

    if (!tokens) throw new ExpressError(409, 'Cannot find YouTube tokens.')
    tokens.remove()
    await user.save()

    // ──────────────────────────────────────────────────────────────

    return {
      success: true,
      message: 'Gmail tokens revoked'
    }

    // ──────────────────────────────────────────────────────────────
  },
  callback: async (req: Request, res: Response, next: NextFunction) => {
    // ─── Retrieve The Code And Get Tokens ─────────────────────────

    const { tokens } = await gmailClient.getToken(req.query.code as string)

    if (!tokens.access_token || !tokens.refresh_token) throw new ExpressError(400, 'Failed to retrieve tokens.')

    // ─── Push Tokens In A Subdocument ─────────────────────────────

    const user = await User.findById(req.user?.id)
    if (!user) throw new ExpressError(500, 'User not found.')
    user.tokens.push({
      service: 'gmail',
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token
    })

    // ─── Save Tokens In The DB And Redirect The User ──────────────

    user.save()
    return res.redirect(process.env.FRONTEND_HOST + '/services')
  }

}

import axios, { AxiosResponse } from 'axios'
import { randomBytes } from 'crypto'
import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'
import { Octokit } from 'octokit'

import ExpressError from '../../classes/ExpressError'
import ITokens from '../../interfaces/ITokens'
import { xDays, xDaysLater } from '../../misc/days'
import User from '../../models/User'
import userServices from '../../services/user'

export default {

  authorize: (res: Response) => {
    const state: string = randomBytes(16).toString('hex')
    const authorizationURL: string =
            'https://github.com/login/oauth/authorize?client_id=' +
            String(process.env.GITHUB_CLIENT_ID) +
            '&redirect_uri=' +
            String(process.env.BACKEND_HOST) +
            String(process.env.GITHUB_REDIRECT_URI) +
            '&state=' + state

    res.cookie('state', state, {
      expires: xDaysLater(30),
      httpOnly: true,
      maxAge: xDays(30),
      sameSite: 'lax'
    })
    return {
      success: true,
      authorizationURL
    }
  },

  revoke: async (userID: Types.ObjectId) => {
    const octokit: Octokit = new Octokit()
    await octokit.rest.apps.deleteToken({
      client_id: String(process.env.GITHUB_CLIENT_ID),
      access_token: await userServices.getAccessToken(userID, 'github')
    })
    const user = await User.findById(userID, 'tokens')
    if (!user) throw new ExpressError(409, 'User not found.')

    const githubTokens: ITokens | undefined = user.tokens.find(tokens => tokens.service === 'github')
    if (!githubTokens) throw new ExpressError(409, 'No Gmail tokens stored.')
    const tokens = user.tokens.id(githubTokens._id)

    if (!tokens) throw new ExpressError(409, 'Cannot find YouTube tokens.')
    tokens.remove()
    await user.save()
    return {
      success: true,
      message: 'GitHub tokens revoked'
    }
  },

  callback: async (req: Request, res: Response, next: NextFunction) => {
    const response: AxiosResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: String(process.env.GITHUB_CLIENT_ID),
      client_secret: String(process.env.GITHUB_SECRET),
      code: req.query.code
    }, { headers: { Accept: 'application/json' } })

    // ─── Push Tokens In A Subdocument ─────────────────────────────

    const user = await User.findById(req.user?.id)
    if (!user) throw new ExpressError(500, 'User not found.')
    user.tokens.push({
      service: 'github',
      accessToken: response.data.access_token
    })

    // ─── Save Tokens In The DB And Redirect The User ──────────────

    user.save()
    return res.redirect(String(process.env.FRONTEND_HOST) + '/services')

    // ──────────────────────────────────────────────────────────────
  }

}

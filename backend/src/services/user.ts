import bcrypt from 'bcrypt'
import { OAuth2Client, TokenPayload, LoginTicket } from 'google-auth-library'
import { HydratedDocument, Types } from 'mongoose'

import ExpressError from '../classes/ExpressError'
import IUser from '../interfaces/IUser'
import User from '../models/User'

export default {
  create: async (email: string, password: string): Promise<Types.ObjectId> => {
    //
    // CHECK IF THE USER IS NOT YET IN THE DB
    //
    if (await User.findOne({ email })) throw new ExpressError(409, 'E-mail already in use.')

    //
    // CREATE AND ADD THE NEW USER TO THE DB
    //
    const newUser: HydratedDocument<IUser> = new User({
      email,
      password: await bcrypt.hash(password, 10),
      tokens: []
    })

    await newUser.save()
    return newUser._id
  },

  createGoogleUser: async (idToken: string) => {
    const homepageURI: string = process.env.FRONTEND_HOST + '/'
    const loginpageURI: string = process.env.FRONTEND_HOST + '/signin'

    // ─── Verify The IdToken ──────────────────────────────────────

    const client: OAuth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    const ticket: LoginTicket = await client.verifyIdToken({
      idToken,
      audience: process.env.CLIENT_ID
    })
    const payload: TokenPayload | undefined = ticket.getPayload()
    const userid: string | undefined = payload?.sub
    if (!payload || !userid) throw new ExpressError()

    // ─── Add The User To The DB Or Ask To Link Accounts ──────────

    const user = await User.findOne({ email: payload.email })
    if (user) {
      if (!user.isLoggedInWithGoogle) {
        // res.redirect(String(process.env.FRONTEND_HOST) + '/signin?email=' + user.email)
        return {
          redirection: loginpageURI + '?email=' + user.email
        }
      }
      // req.user = {
      //   id: user._id,
      //   redirection: String(process.env.FRONTEND_HOST) + '/'
      // }
      return {
        id: user._id,
        redirection: homepageURI
      }
    } else {
      const newUser = new User({
        email: payload.email,
        googleUID: userid,
        isLoggedInWithGoogle: true
      })
      await newUser.save()
      // req.user = {
      //   id: await user.create(),
      //   redirection: String(process.env.FRONTEND_HOST) + '/'
      // }
      return {
        id: newUser._id,
        redirection: homepageURI
      }
    }
  },

  checkPassword: async (email: string, password: string) => {
    const user = await User.findOne({ email })

    if (!user) throw new ExpressError(400, 'User not found.')
    if (!user.password) throw new ExpressError(403, 'Email previously registered with Google.')
    if (!await bcrypt.compare(password, user.password)) throw new ExpressError(400, 'Wrong credentials.')
    if (user.googleUID && !user.isLoggedInWithGoogle) {
      user.isLoggedInWithGoogle = true
      user.save()
    }
    return user._id
  },

  getAccessToken: async (userID: Types.ObjectId, service: string) => {
    const user = await User.findById(userID)
    if (!user) throw new ExpressError(500, 'User not found.')
    const accessToken = user.tokens.find(tokens => tokens.service === service)?.accessToken
    if (!accessToken) throw new ExpressError(500, service + ' access token not found.')
    return accessToken
  },

  getRefreshToken: async (userID: Types.ObjectId, service: string) => {
    const user = await User.findById(userID)
    if (!user) throw new ExpressError(500, 'User not found.')
    const refreshToken = user.tokens.find(tokens => tokens.service === service)?.refreshToken
    if (!refreshToken) throw new ExpressError(500, service + ' refresh token not found.')
    return refreshToken
  }
}

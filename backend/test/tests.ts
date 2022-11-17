//
// ────────────────────────────────────────────────────────── I ──────────
//   :::::: A P I   T E S T S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────
//

// ─── Imports ─────────────────────────────────────────────────────────────────

import assert from 'assert'
import axios, { AxiosResponse } from 'axios'
import * as dotenv from 'dotenv'
import { jwtVerify } from 'jose'
import { after, before, describe, it } from 'mocha'
import { connect, connection } from 'mongoose'
import '../src/app'

import User from '../src/models/User'

// ─────────────────────────────────────────────────────────────────────────────

dotenv.config()

const testUser = {
  email: 'test.test@test.test',
  password: 'P4$$w0rD'
}
const textEncoder: TextEncoder = new TextEncoder()

describe('Authentication', function (): void {
  before(async function () {
    await connect(String(process.env.CONNECTION_STRING))
  })

  after(async function () {
    await User.deleteOne({ email: testUser.email })
    await connection.close()
    process.kill(process.pid, 'SIGTERM')
  })

  describe('Register', async function (): Promise<void> {
    const getJWT: RegExp = /.*jwt=[^;]*/m

    it('response code should be 201', async function (): Promise<void> {
      const response: AxiosResponse = await axios.post('http://localhost:8080/auth/register', {
        email: testUser.email,
        password: testUser.password
      })
      assert.equal(response.status, 201)
      assert.ok(response.headers['set-cookie'])
      if (typeof response.headers['set-cookie'] === 'string') {
        const jwtURLEncoded: RegExpExecArray | null = getJWT.exec(response.headers['set-cookie'])
        assert.ok(jwtURLEncoded)
        const jwt: string = jwtURLEncoded[0].split('=')[1]
        await jwtVerify(jwt, textEncoder.encode(String(process.env.JWT_SECRET)), {
          algorithms: ['HS256'],
          issuer: 'AREA',
          maxTokenAge: '2h'
        })
      } else {
        throw new Error('Cannot parse headers properly')
      }
    })
  })
})

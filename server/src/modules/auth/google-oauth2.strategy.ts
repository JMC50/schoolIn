import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import {config} from '../../../config'

import { Injectable } from '@nestjs/common';
import {UserDetail} from '@/interface/auth'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor() {
    super({
      clientID: config.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: config.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: config.GOOGLE_OAUTH_CLIENT_CALLBACK,
      scope: ['email', 'profile'],
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: Profile): Promise<Omit<UserDetail, 'id'>> {
    const { _json: {email, picture, name } } = profile
    const user = {email, picture, name}
    return user
  }
}
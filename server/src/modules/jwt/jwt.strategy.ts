import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy, VerifiedCallback} from 'passport-jwt'
import { AuthService } from "../auth/auth.service";
import {config} from '../../../config'
import type { UserDetail } from "@/interface/auth";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService:AuthService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.JWT_SECRET,
        })
    }

    async validate(
        payload:UserDetail & {iat: number, exp:number}
    ):Promise<any>{
        const user = await this.authService.tokenValidateUser(payload)
        if(!user){
            throw new UnauthorizedException({message: '존재하지 않는 유저입니다.'})
        }
        return payload
    }
}
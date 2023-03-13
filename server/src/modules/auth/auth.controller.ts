import { Controller, Get, HttpException, Res, Req, UseGuards, Redirect } from "@nestjs/common";
import type { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard'
import { config } from '../../../config'
import { UserService } from "../user/user.service";

@Controller('oauth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) { }

    @Get('login')
    @UseGuards(AuthGuard('google'))
    login() { }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async OAuthGoogleCallback(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response
    ) {
        try {
            const token = await this.authService.createToken(req.user);
            const save = await this.userService.saveUser(req.user);

            console.log(save);
            if(save !== null){
                res.header('Authorization', `Bearer ${token}`);
                res.redirect(`${config.BASE_URL}#register?token=${token}`);
            }else{
                res.header('Authorization', `Bearer ${token}`);
                res.redirect(`${config.BASE_URL}#main?token=${token}`);
            }
        } catch (err) {
            throw err;
        }
    }

    @Get('/check')
    @UseGuards(JwtAuthGuard)
    async foo(
        @Req() req: Request
    ) {
        console.log("asdasdasd");
        const id = await this.authService.getUserId(req.user.email);
        return {
            success: true,
            message: '',
            data: {...req.user, id: id}
        }
    }
}
import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDetail, User } from "@/interface/auth"

interface req_follow {
    from: string;
    to: string;
}

@Controller('user')
export class UserController {
    constructor(
        private userService:UserService,
    ){}
    
    @Get('/user/getInfo/:id')
    async getUser(
        @Param('id') id:string
    ){
        return await this.userService.getUser(id);
    }

    @Get('/user/getuserbyEmail/:email')
    async getuserbyEmail(
        @Param('email') email:string
    ){
        return await this.userService.getUserbyEmail(email);
    }

    @Post('/user/update/:email')
    async userUpdate(
        @Param('email') email:string,
        @Body() userData:User
    ){
        return await this.userService.updateUser(userData);
    }
}
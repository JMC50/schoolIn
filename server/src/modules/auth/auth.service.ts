import { UserEntity } from '@/entity'
import { UserDetail } from '@/interface/auth'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        @InjectRepository(UserEntity) 
        private userRepository: Repository <UserEntity>
    ) { }

    async tokenValidateUser(payload: UserDetail & { iat: number, exp: number }) {
        return this.userService.getUser(payload.id)
    }

    async createToken(user: UserDetail) {
        return this.jwtService.sign(user, { expiresIn: '30d' })
    }

    async getUserId(email: string) {
        const res = await this.userRepository.findOne({
            where: {email}
        })
        return res.id;
    }
}
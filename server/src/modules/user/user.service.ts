import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '@/entity'
import { User, UserDetail } from '@/interface/auth'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    ){}

    async saveUser(userData:UserDetail){
        const user = await this.userRepository.findOne({
            where: {
                email: userData.email
            }
        });

        if(!user){
            const user = new UserEntity()
            user.gid = userData.name;
            user.email = userData.email;
            user.picture = userData.picture;
            this.userRepository.save(user);
            return true;
        }else if(user.age == null){
            return true;
        }
        return null
    }

    async updateUser(userData:User){
        const user = await this.userRepository.findOne({
            where: {
                email: userData.email
            }
        });

        await this.userRepository.update(user.id, {
            age : userData.age,
            name: userData.name,
            class: userData.class,
            number: userData.number,
            barcode: userData.barcode
        })

        console.log("업데이트 완료")
        return true;
    }

    async getUsers(){
        return await this.userRepository.find()
    }

    async getUserbyEmail(email:string){
        return await this.userRepository.findOne({
            where: {
                email: email
            }
        })
    }

    async getUser(userId:string){
        return await this.userRepository.findOne({
            where: {
                id: userId
            }
        })
    }
}
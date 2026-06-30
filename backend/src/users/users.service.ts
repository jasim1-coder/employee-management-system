import {  Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user-dto.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma : PrismaService) {}

    async create(user : CreateUserDto){

              const newUser = await  this.prisma.user.create({
            data : {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,                }
            })
return {
    id: newUser.id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    role: newUser.role,
};
    }
async findByEmail(email : string){
    return this.prisma.user.findUnique({
        where : {
            email
        }
    })
}
    
}

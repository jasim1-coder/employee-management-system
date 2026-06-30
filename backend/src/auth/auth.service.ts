import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user-dto.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

        constructor(private userService : UsersService){}

    async register(createUserDto : CreateUserDto){
            const existingUser = await this.userService.findByEmail(createUserDto.email)
    if(existingUser){
        throw new ConflictException("Email already exists.");
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

     return this.userService.create({
        ...createUserDto,
        password: hashedPassword
    })

    }
}

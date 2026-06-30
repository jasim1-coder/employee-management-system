import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user-dto.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

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


    async login(loginDto : LoginDto){

        const user = await this.userService.findByEmail(loginDto.email);
            if(!user){
        throw new UnauthorizedException("Invalid email or password.");
        }

        const isPasswordValid = await bcrypt.compare(
            loginDto.password,
            user.password
        )

        if(!isPasswordValid){
        throw new UnauthorizedException("Invalid email or password.");
        }

        return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
};

    }

}

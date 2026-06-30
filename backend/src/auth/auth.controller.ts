import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import express from 'express';
import { CreateUserDto } from 'src/users/dto/create-user-dto.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService : AuthService){}

@Get('me')
@UseGuards(JwtAuthGuard)
getProfile(@Req() req: express.Request) {
    return req.user;
}


    @Post('register')
    register(@Body() createUserDto : CreateUserDto){
        return this.authService.register(createUserDto);
    }

    @Post('login')
    login(@Body() loginDto : LoginDto){
        return this.authService.login(loginDto);
    }

    
}

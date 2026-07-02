import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy/jwt.strategy';
import { RolesGuard } from './guards/roles/roles.guard';
import { ConfigService } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';
@Module({
  imports: [UsersModule ,
    
    JwtModule.registerAsync({
      inject : [ConfigService] ,
      useFactory : (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
JwtSignOptions : {
        expiresIn: configService.getOrThrow<string>('JWT_EXPIRES_IN')
      },
      }),
    }),

  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard]
})
export class AuthModule {}

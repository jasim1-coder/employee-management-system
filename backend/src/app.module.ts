import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth.module';
import { DepartmentsModule } from './departments/departments.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal : true,
    }),
    
    UsersModule, EmployeesModule, AuthModule, DepartmentsModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

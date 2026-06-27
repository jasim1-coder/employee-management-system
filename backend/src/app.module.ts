import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth.module';
import { DepartmentsModule } from './departments/departments.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UserModule, EmployeesModule, AuthModule, DepartmentsModule, UsersModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}

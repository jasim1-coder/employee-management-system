import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth.module';
import { DepartmentsModule } from './departments/departments.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, EmployeesModule, AuthModule, DepartmentsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

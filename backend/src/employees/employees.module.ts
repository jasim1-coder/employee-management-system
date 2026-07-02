import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { DepartmentsModule } from 'src/departments/departments.module';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports:[DepartmentsModule]
})
export class EmployeesModule {}

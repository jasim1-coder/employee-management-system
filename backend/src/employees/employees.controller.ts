import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/decorators/roles/roles.decorator';
import { Role } from '@prisma/client';
@Controller('employees')
export class EmployeesController {

    constructor(private readonly employeeService :  EmployeesService)  {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get()
    findAll(){
        return this.employeeService.findAll();
    }
    
    @Get(':id')
     findOne (@Param('id') id : string){
            return this.employeeService.findOne(id);
    }

    @Post()
    create(@Body() employeeData :  CreateEmployeeDto){
        return this.employeeService.create(employeeData);
    }

    @Put(':id')
    update(@Body() updateEmployeeDto : UpdateEmployeeDto , @Param('id') id : string){
        return this.employeeService.update(id ,updateEmployeeDto);
    }

    @Delete(':id')   
    @HttpCode(HttpStatus.OK)      
    remove(@Param('id' , ) id : string){
        return this.employeeService.remove(id);
    }

}

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {

    constructor(private readonly employeeService :  EmployeesService)  {}

    @Get()
    findAll(){
        return this.employeeService.findAll();
    }
    
    @Get(':id')
     findOne (@Param('id', ParseIntPipe) id : number){
            return this.employeeService.findOne(id);
    }

    @Post()
    create(@Body() employeeData :  CreateEmployeeDto){
        return this.employeeService.create(employeeData);
    }

    @Put(':id')
    update(@Body() updateEmployeeDto : UpdateEmployeeDto , @Param('id',  ParseIntPipe) id : number){
        return this.employeeService.update(id ,updateEmployeeDto);
    }

    @Delete(':id')   
    @HttpCode(HttpStatus.OK)      
    remove(@Param('id' , ParseIntPipe) id : number){
        return this.employeeService.remove(id);
    }

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {

    private employees = [
        { id: 1 ,firstName : 'muhammed', lastName : 'jasim' , email : 'jasim@gmail.com' , phone : '8181818181' , department : 'IT' , salary :5000},
        {id : 2 , firstName : 'muhammed', lastName : 'jebin' , email : 'jebin@gmail.com' , phone : '8111818181' , department : 'IT' , salary :8000},
    ]

    findAll(){
        return this.employees;
    }

    findOne(id : number){
        return this.employees.find(employee => employee.id === id);
    }

    create(emp : CreateEmployeeDto){
        const newEmployee = {
            id : this.employees.length + 1 ,
            firstName: emp.firstName ,
            lastName: emp.lastName,
            email: emp.email,
            phone:  emp.phone,
            department: emp.department,
            salary: emp.salary,
        }
        this.employees.push(newEmployee);
        return newEmployee ;
    }

    update(id : number , emp : UpdateEmployeeDto){
        const employee = this.employees.find(employee => employee.id === id);

        if(!employee){
            throw new NotFoundException('Employee not found')
        }
        const updatedEmployee = {
            ...employee,
            ...emp
        }
        const position = this.employees.findIndex(employeees => employeees.id === id);
        this.employees[position] = updatedEmployee; 
        return updatedEmployee;
    }

    remove(id : number){
        this.employees = this.employees.filter(emp => emp.id !== id);
        return { message :"Employee deleted successfully"} ;
    }

}

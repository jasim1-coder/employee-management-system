import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeesService {

    constructor(private readonly prisma : PrismaService) {}

    async findAll(){
        return  this.prisma.employee.findMany();
    }

    async findOne(id : string){
        
        const employee = await this.prisma.employee.findUnique({where:{id},});
        if(!employee){
            throw new NotFoundException("Employee not found") ;
        }

        return employee;
    }
 
   async create(emp : CreateEmployeeDto){

        const existingEmployee = await this.prisma.employee.findUnique({where:{ email : emp.email,},});
        if(existingEmployee){
            throw new ConflictException("Email already exists.")
        }

          const newEmployee = await  this.prisma.employee.create({
            data : {
            ...emp
                }
            })
        return newEmployee;
        };
        

   async update(id : string , emp : UpdateEmployeeDto){
        const employee = await this.prisma.employee.findUnique({
            where : {id},
        });

        if(!employee){
            throw new NotFoundException('Employee not found')
        }

      const updatedEmployee = await this.prisma.employee.update({
        where : {
            id,
        },
        data : {
            ...emp
        }
      })
      return updatedEmployee;
        
    };

    async remove(id : string){

        const employee = await this.prisma.employee.findUnique({where:{id},});
        if(!employee){
            throw new NotFoundException("Employee not found") ;
        }

      await  this.prisma.employee.delete({
            where : {
                id
            }
        });
        return { message :"Employee deleted successfully"} ;
    }

}

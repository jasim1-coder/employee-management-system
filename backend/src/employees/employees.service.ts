import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DepartmentsService } from 'src/departments/departments.service';

@Injectable()
export class EmployeesService {

    constructor(private readonly prisma : PrismaService, private readonly departmentService : DepartmentsService) {}

    async findAll(){
return this.prisma.employee.findMany({
    include: {
        department: true,
    },
});    }

  async findOne(id: string) {
  const employee = await this.prisma.employee.findUnique({
    where: { id },
    include: {
      department: true,
    },
  });

  if (!employee) {
    throw new NotFoundException('Employee not found');
  }

  return employee;
}
 
   async create(emp : CreateEmployeeDto){

const existingEmployee = await this.findByEmail(emp.email);
        if(existingEmployee){
            throw new ConflictException("Email already exists.")
        }

         await this.departmentService.findById(emp.departmentId);


          const newEmployee = await  this.prisma.employee.create({
   data: {
    firstName: emp.firstName,
    lastName: emp.lastName,
    email: emp.email,
    phone: emp.phone,
    salary: emp.salary,

    department: {
        connect: {
            id: emp.departmentId,
        },
    },
}
            })
        return newEmployee;
        };
        

        async findByEmail(email: string) {
    return this.prisma.employee.findUnique({
        where: {
            email,
        },
    });
}

   async update(id: string, emp: UpdateEmployeeDto) {
  // Check if employee exists
  await this.findOne(id);

  // If department is being changed, verify it exists
  if (emp.departmentId) {
    await this.departmentService.findById(emp.departmentId);
  }

  const updatedEmployee = await this.prisma.employee.update({
    where: {
      id,
    },
    data: {
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.email,
      phone: emp.phone,
      salary: emp.salary,

      ...(emp.departmentId && {
        department: {
          connect: {
            id: emp.departmentId,
          },
        },
      }),
    },
  });

  // Return employee with department included
  return this.findOne(updatedEmployee.id);
}
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

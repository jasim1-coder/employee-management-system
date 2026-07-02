import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.department.findMany();
  }

  async create(createDepartmentDto: CreateDepartmentDto) {
    const exists = await this.findByName(createDepartmentDto.name);

    if (exists) {
      throw new ConflictException('Department already exists.');
    }

    return this.prisma.department.create({
      data: createDepartmentDto,
    });
  }

  async findByName(name: string) {
    return this.prisma.department.findUnique({
      where: {
        name,
      },
    });
  }

  async findById(id: string) {
    const department = await this.prisma.department.findUnique({
      where: {
        id,
      },
    });

    if (!department) {
      throw new NotFoundException('Department not found.');
    }

    return department;
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    await this.findById(id);

    if (updateDepartmentDto.name) {
      const existing = await this.findByName(updateDepartmentDto.name);

      if (existing && existing.id !== id) {
        throw new ConflictException(
          'Department with same name already exists.',
        );
      }
    }

    return this.prisma.department.update({
      where: { id },
      data: updateDepartmentDto,
    });
  }

  async remove(id: string) {
    await this.findById(id);

    const employeeCount = await this.prisma.employee.count({
      where: {
        departmentId: id,
      },
    });

    if (employeeCount > 0) {
      throw new ConflictException(
        'Cannot delete department because employees are assigned.',
      );
    }

    await this.prisma.department.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Department deleted successfully.',
    };
  }
}
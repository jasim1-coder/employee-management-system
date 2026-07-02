import { PartialType } from "@nestjs/mapped-types";
import { CreateDepartmentDto } from "../create-department.dto/create-department.dto";

export class UpdateDepartmentDto  extends PartialType(CreateDepartmentDto){}

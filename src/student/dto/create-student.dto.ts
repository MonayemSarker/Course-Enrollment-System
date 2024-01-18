import { IsString, IsEmail, IsNumber } from "class-validator";

export class CreateStudentDto{
    @IsString()
    name: string;
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    @IsString()
    phone: string;
    @IsNumber()
    level: number;
    @IsNumber()
    grade: number;
}
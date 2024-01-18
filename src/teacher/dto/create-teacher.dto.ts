import { IsString, IsEmail,  } from "class-validator";

export class CreateTeacherDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    phone: string;

    @IsString()
    designation: string;

    @IsString()
    specialization: string;
}
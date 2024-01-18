import { Body, Controller, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { SignInDto } from 'src/dto/signin.dto';

@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService){}

    @Post('signup')
    createStudent(@Body() body: CreateStudentDto){
        const user = this.studentService.signup(body);
        return user;
    }

    @Post('')
    loginStudent(@Body() body: SignInDto){
        const user = this.studentService.signin(body.email, body.password);
        return user;   
    }
}

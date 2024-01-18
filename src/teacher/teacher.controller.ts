import { Controller, Body, Post, Get } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherService } from './teacher.service';
import { SignInDto } from 'src/dto/signin.dto';


@Controller('teacher')
export class TeacherController {
    constructor(private teacherService: TeacherService){}

    @Post('signup')
    createTeacher(@Body() body: CreateTeacherDto){
        const user = this.teacherService.signup(body);
        return user;
    }

    @Post('')
    loginTeacher(@Body() body: SignInDto){
        const user = this.teacherService.signin(body.email, body.password);
        return user;
        
    }
}

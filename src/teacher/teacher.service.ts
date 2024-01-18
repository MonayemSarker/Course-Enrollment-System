import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TeacherService {
    constructor(@InjectRepository(Teacher) private repo: Repository<Teacher>){}

    async signup(teacherDto: CreateTeacherDto){
        const users = await this.findByEmail(teacherDto.email);
        // console.log(user);
        
        if(users.length > 0){
            throw new BadRequestException('Email already in use');
        }

        const user = await this.repo.create(teacherDto);
        // console.log(usr);
        
        return this.repo.save(user);
    }

    findByEmail(email: string){
        return this.repo.find(
            {where: {email: email}}
        );
    }

    async signin(email: string, password: string){
        const users = await this.findByEmail(email);
        if(users.length == 0){
            throw new NotFoundException("No Teacher with this Email");
        }
        const user = users[0];
        if(user.password!= password){
            throw new BadRequestException("Wrong Password");
        }
        return user; 
    }

}

import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(@InjectRepository(Student) private repo: Repository<Student>) {}

  async signup(studentDto: CreateStudentDto) {
    const students = await this.findByEmail(studentDto.email);
    if (students.length > 0) {
      throw new BadRequestException('Email already in use');
    }
    const student = await this.repo.create(studentDto);
    return this.repo.save(student);
  }

  async signin(email: string, password: string) {
    const students = await this.findByEmail(email);
    if (students.length == 0) {
      throw new NotFoundException('No Student with this Email');
    }
    const student = students[0];
    if (student.password != password) {
      throw new UnauthorizedException('invalid password');
    }
    return student;
  }

  findByEmail(email: string) {
    return this.repo.find({
      where: {
        email: email,
      },
    });
  }
}

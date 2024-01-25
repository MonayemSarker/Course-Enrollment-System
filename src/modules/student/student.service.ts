import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(@InjectRepository(Student) private repo: Repository<Student>) {}

  async create(student: CreateStudentDto) {
    const newStudent = await this.repo.create(student);
    return this.repo.save(newStudent);
  }

  async update(id: number, updateStudent: UpdateStudentDto) {
    const existingStudent = await this.repo.findOneBy({ id: id });
    if (!existingStudent) {
      throw new UnauthorizedException('No Student found with id ' + { id });
    }
    this.repo.merge(existingStudent, updateStudent);
    return this.repo.save(existingStudent);
  }

  findStudent(id: number) {
    return this.repo.findOneBy({ id: id });
  }
}

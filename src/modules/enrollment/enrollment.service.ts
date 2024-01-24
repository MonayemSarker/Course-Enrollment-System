import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './enrollment.entity';
import { Repository } from 'typeorm';
import { Student } from '../student/student.entity';
import { Course } from '../course/course.entity';
import { ApproveEnrollmentDto } from './dto/approve-enrollment.dto';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment) private repo: Repository<Enrollment>,
  ) {}

  findAll(): Promise<Enrollment[]> {
    return this.repo.find();
  }

  async studentEnrollment(id: number): Promise<Enrollment[]> {
    const enrollments = await this.repo.find({
      relations: ['student', 'course'],
      where: { student: { id: id } },
    });

    return enrollments;
  }

  async enroll(student: Student, course: Course) {
    const enrollment = new Enrollment();
    enrollment.student = student;
    enrollment.course = course;
    return this.repo.save(enrollment);
  }

  async findEnrollment(course: Course) {
    const enrollment = await this.repo.findOne({
      relations: ['student', 'course'],
      where: { course: { courseCode: course.courseCode } },
    });
    return enrollment;
  }

  async approve(approveEnrollmentDto: ApproveEnrollmentDto) {
    const enrollment = await this.repo.findOne({
      where: { id: approveEnrollmentDto.id },
    });

    if (!enrollment) {
      throw new NotFoundException('No such enrollment found');
    }

    await this.repo.merge(enrollment, approveEnrollmentDto);
    return this.repo.save(enrollment);
  }
}

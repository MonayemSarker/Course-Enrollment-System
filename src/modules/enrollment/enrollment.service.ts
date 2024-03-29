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
    return this.repo.find({
      relations: {
        course: true,
        student: true,
      },
    });
  }

  getStudentEnrollments(id: number): Promise<Enrollment[]> {
    return this.repo.find({
      relations: ['student', 'course'],
      where: { student: { id: id } },
    });
  }

  async enroll(student: Student, course: Course) {
    const enrollment = new Enrollment();
    enrollment.student = student;
    enrollment.course = course;
    return this.repo.save(enrollment);
  }

  findCourseEnrollments(course: Course) {
    return this.repo.findOne({
      relations: ['student', 'course'],
      where: { course: { courseCode: course.courseCode } },
    });
  }

  async approveEnrollment(approveEnrollmentDto: ApproveEnrollmentDto) {
    const enrollment = await this.repo.findOne({
      where: { id: approveEnrollmentDto.id },
    });

    if (!enrollment) {
      throw new NotFoundException('No such enrollment found');
    }

    this.repo.merge(enrollment, approveEnrollmentDto);
    return this.repo.save(enrollment);
  }

  async getTeachersEnrollments(courses: Course[]) {
    const enrollments = [];
    const promises = [];

    courses.forEach((course) => {
      const promise = this.findCourseEnrollments(course).then((enrollment) => {
        if (enrollment != null) enrollments.push(enrollment);
      });
      promises.push(promise);
    });
    await Promise.all(promises);
    return enrollments;
  }

  async getTeachersEnrollmentsID(courses: Course[]) {
    const enrollments = [];
    const promises = [];

    courses.forEach((course) => {
      const promise = this.findCourseEnrollments(course).then((enrollment) => {
        if (enrollment != null) enrollments.push(enrollment.id);
      });
      promises.push(promise);
    });
    await Promise.all(promises);
    return enrollments;
  }
}

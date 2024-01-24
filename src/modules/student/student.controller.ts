import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AccessTokenGuard } from '../user/guard/accessToken.guard';
import { Request } from 'express';
import { CourseService } from '../course/course.service';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateStudent: UpdateStudentDto,
  ) {
    // console.log(updateStudent);

    const updatedStudent = this.studentService.update(id, updateStudent);
    return updatedStudent;
  }

  @UseGuards(AccessTokenGuard)
  @Get('courses')
  async getAvailableCourses(@Req() req: Request) {
    const studentId = req.user['sub'];
    const student = await this.studentService.findStudent(parseInt(studentId));
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    const courses = await this.courseService.getPublishedCourses();
    if (courses.length == 0) {
      return [];
    }
    return courses;
  }

  @UseGuards(AccessTokenGuard)
  @Post('enroll/:courseCode')
  async enroll(
    @Param('courseCode', ParseIntPipe) courseCode: number,
    @Req() req: Request,
  ) {
    const studentId = req.user['sub'];
    const student = await this.studentService.findStudent(parseInt(studentId));
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    const course = await this.courseService.findPublishedCourse(courseCode);
    if (!course) {
      throw new NotFoundException('Course Not Available');
    }

    const enrollment = await this.enrollmentService.enroll(student, course);
    console.log(enrollment);

    return enrollment;
  }
}

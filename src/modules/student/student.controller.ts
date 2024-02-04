import {
  Body,
  Controller,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AccessTokenGuard } from '../user/guard/accessToken.guard';
import { Request } from 'express';
import { CourseService } from '../course/course.service';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Student')
@Controller('students')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
export class StudentController {
  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
  ) {}

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateStudent: UpdateStudentDto,
  ) {
    return this.studentService.update(id, updateStudent);
  }

  @Post('enroll/:courseCode')
  async enroll(
    @Param('courseCode', ParseIntPipe) courseCode: number,
    @Req() req: Request,
  ) {
    if (req.user['type'] !== 'Student') {
      throw new UnauthorizedException('Student not found');
    }
    const student = await this.studentService.findStudent(
      parseInt(req.user['sub']),
    );

    const course = await this.courseService.findIfPublishedCourse(courseCode);
    if (!course) {
      throw new NotFoundException('Course Not Available');
    }
    return this.enrollmentService.enroll(student, course);
  }
}

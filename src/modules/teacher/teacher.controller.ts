import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { AccessTokenGuard } from '../user/guard/accessToken.guard';
import { Request } from 'express';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { ApproveEnrollmentDto } from '../enrollment/dto/approve-enrollment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Teacher')
@Controller('teachers')
export class TeacherController {
  constructor(
    private teacherService: TeacherService,
    private enrollmentService: EnrollmentService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get('enrollments')
  async getEnrollments(@Req() req: Request) {
    const teacherId = req.user['sub'];
    const courses = await this.teacherService.findTeacherCourses(
      parseInt(teacherId),
    );
    // console.log('COURSES: ' + courses);

    const enrollments = [];
    const promises = [];

    courses.forEach((course) => {
      const promise = this.enrollmentService
        .findCourseEnrollments(course)
        .then((enrollment) => {
          // console.log(enrollment);

          if (enrollment != null) enrollments.push(enrollment);
        });
      promises.push(promise);
    });
    await Promise.all(promises);
    return enrollments;
  }

  @UseGuards(AccessTokenGuard)
  @Patch('approve')
  approveEnrollment(@Body() body: ApproveEnrollmentDto) {
    return this.enrollmentService.approveEnrollment(body);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateTeacher: UpdateTeacherDto,
  ) {
    return this.teacherService.update(id, updateTeacher);
  }
}

import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { Request } from 'express';
import { AccessTokenGuard } from '../user/guard/accessToken.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TeacherService } from '../teacher/teacher.service';
import { ApproveEnrollmentDto } from './dto/approve-enrollment.dto';

@ApiTags('Enrollment')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
@Controller('enrollments')
export class EnrollmentController {
  constructor(
    private enrollmentService: EnrollmentService,
    private teacherService: TeacherService,
  ) {}

  @Get()
  findAll() {
    return this.enrollmentService.findAll();
  }

  @Get('myEnrollments')
  async getEnrollment(@Req() req: Request) {
    if (req.user['type'] === 'Student') {
      return this.enrollmentService.getStudentEnrollments(
        parseInt(req.user['sub']),
      );
    } else if (req.user['type'] === 'Teacher') {
      const courses = await this.teacherService.findTeacherCourses(
        parseInt(req.user['sub']),
      );
      return this.enrollmentService.getTeachersEnrollments(courses);
    }
  }

  @Patch('approve')
  async approveEnrollment(
    @Body() body: ApproveEnrollmentDto,
    @Req() req: Request,
  ) {
    if (req.user['type'] !== 'Teacher') {
      throw new UnauthorizedException('User is not a Teacher');
    }
    const courses = await this.teacherService.findTeacherCourses(
      parseInt(req.user['sub']),
    );

    const teachersEnrollmentIDs =
      await this.enrollmentService.getTeachersEnrollmentsID(courses);

    if (!teachersEnrollmentIDs.includes(body.id)) {
      throw new UnauthorizedException(
        'Teacher has no access to this enrollment',
      );
    }
    return this.enrollmentService.approveEnrollment(body);
  }
}

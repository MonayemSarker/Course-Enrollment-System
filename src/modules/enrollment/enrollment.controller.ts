import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { Request } from 'express';
import { AccessTokenGuard } from '../user/guard/accessToken.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Enrollment')
@Controller('enrollments')
export class EnrollmentController {
  constructor(private enrollmentService: EnrollmentService) {}

  @Get()
  findAll() {
    return this.enrollmentService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get('myEnrollments')
  studentEnrollment(@Req() req: Request) {
    const studentId = req.user['sub'];
    return this.enrollmentService.getStudentEnrollments(parseInt(studentId));
  }
}

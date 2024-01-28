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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Teacher')
@UseGuards(AccessTokenGuard)
@Controller('teachers')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateTeacher: UpdateTeacherDto,
  ) {
    return this.teacherService.update(id, updateTeacher);
  }
}

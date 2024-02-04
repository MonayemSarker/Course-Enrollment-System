import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { TeacherModule } from '../teacher/teacher.module';
import { EnrollmentModule } from '../enrollment/enrollment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    TeacherModule,
    EnrollmentModule,
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}

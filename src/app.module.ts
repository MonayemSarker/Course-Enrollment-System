import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { StudentModule } from './modules/student/student.module';
import { CourseModule } from './modules/course/course.module';
import { EnrollmentModule } from './modules/enrollment/enrollment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';
import { dataSourceOption } from './db/db.config';

@Module({
  imports: [
    UserModule,
    TeacherModule,
    StudentModule,
    CourseModule,
    EnrollmentModule,
    TypeOrmModule.forRoot(dataSourceOption),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

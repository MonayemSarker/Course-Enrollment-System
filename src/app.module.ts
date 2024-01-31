import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { StudentModule } from './modules/student/student.module';
import { CourseModule } from './modules/course/course.module';
import { EnrollmentModule } from './modules/enrollment/enrollment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from './db/db.config';
import { DemoMigrationModule } from './modules/demo-migration/demo-migration.module';

@Module({
  imports: [
    UserModule,
    TeacherModule,
    StudentModule,
    CourseModule,
    EnrollmentModule,
    TypeOrmModule.forRoot(dataSourceOption),
    DemoMigrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

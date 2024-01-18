import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Teacher } from './teacher/teacher.entity';
import { Student } from './student/student.entity';
import { Course } from './course/course.entity';
import { Enrollment } from './enrollment/enrollment.entity';

@Module({
  imports: [TeacherModule, StudentModule, CourseModule, EnrollmentModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    // TypeOrmModule.forRootAsync({
    // inject: [ConfigService],
    // useFactory: (config: ConfigService) => {
    //   return {
    //     type: 'mysql',
    //     host: config.get('HOST'),
    //     port: config.get('DB_PORT'),
    //     username: config.get('USERNAME'),
    //     database: config.get('DATABASE'),
    //     entities: [Teacher, Student, Course, Enrollment],
    //     synchronize: true
    //   }}})
  TypeOrmModule.forRoot({
    type: 'mysql', // Use 'mysql' for MySQL
    host: '127.0.0.1',
    port: 3306, // Default MySQL port
    username: 'root',
    password: 'admin',
    database: 'ces',
    entities: [Teacher, Student, Course, Enrollment],
    synchronize: true, 

  })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

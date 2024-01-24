import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthUserService } from './auth-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategy/accesstoken.strategy';
import { RefreshTokenStrategy } from './strategy/refreshtoken.strategy';
import { TeacherModule } from '../teacher/teacher.module';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({}),
    TeacherModule,
    StudentModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AuthUserService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [AuthUserService],
})
export class UserModule {}

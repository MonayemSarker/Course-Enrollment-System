import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthUserService } from './auth-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategy/accesstoken.strategy';
import { RefreshTokenStrategy } from './strategy/refreshtoken.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  controllers: [UserController],
  providers: [
    UserService,
    AuthUserService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class UserModule {}

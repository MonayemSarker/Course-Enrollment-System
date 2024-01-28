import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin-user.dto';
import { AuthUserService } from './auth-user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users/public')
export class UserPublicController {
  constructor(private authService: AuthUserService) {}

  @Post('signup')
  create(@Body() body: CreateUserDto) {
    return this.authService.create(body);
  }

  @Post('signin')
  login(@Body() body: SignInDto) {
    return this.authService.login(body.email, body.password);
  }
}

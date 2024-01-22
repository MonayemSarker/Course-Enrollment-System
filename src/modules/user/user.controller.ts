import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin-user.dto';
import { AuthUserService } from './auth-user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthUserService,
  ) {}

  @Get('')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post('signup')
  create(@Body() body: CreateUserDto) {
    return this.authService.create(body);
  }

  @Post('signin')
  login(@Body() body: SignInDto) {
    return this.authService.login(body.email, body.password);
  }

  isLoggedIn() {}
}

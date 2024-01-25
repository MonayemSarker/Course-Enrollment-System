import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin-user.dto';
import { AuthUserService } from './auth-user.service';
import { Request } from 'express';
import { AccessTokenGuard } from './guard/accessToken.guard';
import { RefreshTokenGuard } from './guard/refreshToken.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthUserService,
  ) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post('signup')
  create(@Body() body: CreateUserDto) {
    return this.authService.create(body);
  }

  @Post('signin')
  login(@Body() body: SignInDto) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(AccessTokenGuard)
  @Get('signout')
  logout(@Req() req: Request) {
    console.log('helloo');

    this.authService.logout(req.user['sub']);
  }

  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: string) {
  //   return this.userService.findOne(id);
  // }

  @UseGuards(AccessTokenGuard)
  @Get('whoAmI')
  @ApiBearerAuth()
  isLoggedIn(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refreshToken')
  refreshToken(@Req() req: Request) {
    // console.log(req.user);

    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}

import { Body, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthTeacherService } from './auth-teacher.service';
import { SignInDto } from 'src/dto/signin.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthTeacherService,
    @Body() body: SignInDto,
  ) {
    super();
    this.validate(body);
  }

  async validate(signinDto: SignInDto) {
    const user = await this.authService.signin(signinDto);
    // const { password, email, ...rest } = user;
    console.log('loacl strategy user' + user);
    return user;
  }
}

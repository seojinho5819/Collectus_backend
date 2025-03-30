import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: any) {
    return this.authService.login(loginDto);
  }

  @Post('kakao/native')
  async kakaoLogin(@Body('idToken') idToken: string) {
    const kakaoUser = await this.authService.verifyKakaoToken(idToken);
    return this.authService.validateOAuthUser(kakaoUser);
  }

  // @Post('refresh')
  // async refreshToken(@Body() refreshToken: string) {
  //   return this.authService.refreshToken(refreshToken);
  // }
}

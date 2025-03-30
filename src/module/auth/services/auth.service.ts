import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async login(loginDto: any) {}
  public async verifyKakaoToken(idToken: string): Promise<any> {
    const KAKAO_TOKEN_VERIFY_URL = 'https://kauth.kakao.com/oauth/tokeninfo';

    try {
      const response = await axios.post(KAKAO_TOKEN_VERIFY_URL, {
        params: { id_token: idToken },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      });

      if (!response.data) {
        throw new UnauthorizedException('Invalid Kakao ID token');
      }

      return response.data;
    } catch (error) {
      throw new UnauthorizedException('Kakao token verification failed');
    }
  }

  validateOAuthUser(kakaoUser: any) {
    const user = {
      provider: 'kakao',
      providerId: kakaoUser.sub,
      email: kakaoUser.email || null, // 일부 계정은 이메일이 없을 수도 있음
      nickname: kakaoUser.nickname || null,
      profileImage: kakaoUser.picture || null,
    };

    // TODO: DB에 사용자 저장 또는 조회하는 로직 추가 가능
    return { accessToken: this.jwtService.sign(user) };
  }
}

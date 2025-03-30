import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload } from '../types/auth.type';

@Injectable()
export class TokenService {
  private readonly ACCESS_TOKEN_SECRET: string;
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {
    this.ACCESS_TOKEN_SECRET = configService.get('ACCESS_TOKEN_SECRET')!;
  }
  async verifyToken(accessToken: string): Promise<AccessTokenPayload> {
    const secret = this.ACCESS_TOKEN_SECRET;
    await this.jwtService.verifyAsync(accessToken, { secret });
    return this.decodeToken(accessToken);
  }

  decodeToken(accessToken: string): AccessTokenPayload {
    return this.jwtService.decode(accessToken);
  }
}

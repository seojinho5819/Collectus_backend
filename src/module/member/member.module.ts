import { Module } from '@nestjs/common';
import { MemberService } from './services/member.service';

@Module({
  exports: [MemberService],
  providers: [MemberService],
})
export class MemberModule {}

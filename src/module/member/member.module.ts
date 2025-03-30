import { Module } from '@nestjs/common';
import { MemberService } from './services/member.service';
import { MemberController } from './member.controller';
import { Member } from './entities/member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  exports: [MemberService],
  providers: [MemberService],
  controllers: [MemberController],
  imports: [TypeOrmModule.forFeature([Member])],
})
export class MemberModule {}

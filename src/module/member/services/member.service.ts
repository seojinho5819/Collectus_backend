import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Member } from '../entities/member.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}
  async getMemberById(id: string): Promise<Member> {
    if (!id) throw new Error('id has gone');

    const member = await this.memberRepository.findOne({
      where: { id: Number(id) },
    });

    if (!member) {
      throw new NotFoundException(`Member with id ${id} not found`);
    }

    return member;
  }

  async getMemberByEmail(email: string): Promise<Member> {
    if (!email) throw new Error('id has gone');

    const member = await this.memberRepository.findOne({
      where: { email: email },
    });

    if (!member) {
      throw new NotFoundException(`Member with email ${email} not found`);
    }

    return member;
  }
}

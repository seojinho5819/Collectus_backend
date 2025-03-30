import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MemberService } from './services/member.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Member')
@Controller('member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get('/:id')
  @ApiOperation({
    summary: '사용자 정보 조회',
    description: '사용자의 ID를 기반으로 정보를 조회합니다.',
  })
  @ApiParam({ name: 'id', required: true, description: '사용자 ID' })
  getUserById(@Param('id') id: string) {
    console.log('id >>', id);
    console.log('id >>', id);
    return this.memberService.getMemberById(id);
  }

  @Post('')
  createUser(@Body() body: any) {
    console.log('body >>', body);
  }
}

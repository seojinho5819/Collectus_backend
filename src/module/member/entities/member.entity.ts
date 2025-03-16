import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MemberInterface } from '../types/member.type';

@Entity('member')
export class Member implements MemberInterface {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ comment: '이름' })
  name: string;

  @Column({ comment: '생년월일' })
  birth: string;

  @Column({ comment: '성별' })
  gender: string;

  @Column({ comment: '회원 유형' })
  type: string;

  @Column({ comment: '이메일 주소' })
  email: string;

  @Column({ comment: '비밀번호' })
  password: string;

  @Column({ comment: '닉네임' })
  nickName: string;

  @Column({ comment: '전화번호' })
  phone: string;

  @Column({ type: 'simple-array', comment: '주소' })
  address: string[];

  @Column({ default: false, comment: '본인 인증 여부' })
  isIdentityVerified: boolean;

  @Column({ default: false, comment: '광고성 정보 동의 여부' })
  isAgreeAdvertisement: boolean;

  @Column({
    type: 'timestamp',
    nullable: true,
    comment: '최초 광고성 정보 동의 시간',
  })
  firstAdConsentTime: Date;

  @Column({ comment: '회원 등급' })
  grade: string;

  @Column({ comment: '소셜 로그인 ID' })
  socialId: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    comment: '소셜 로그인 연동 일시',
  })
  socialLoginIntegrationDuration: Date;

  @Column({ comment: '회원 상태' })
  memberState: string;

  @Column({ type: 'simple-array', comment: '알림 상태' })
  alarmState: string[];

  @Column({ type: 'timestamp', comment: '최종 로그인 시간' })
  lastLoginAt: Date;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, comment: '삭제일' })
  deletedAt: Date;
}

export class MemberInterface {
  id: number;
  name: string;
  birth: string;
  gender: string;
  type: string;
  email: string;
  password: string;
  nickName: string;
  phone: string;
  address: string[];
  isIdentityVerified: boolean;
  isAgreeAdvertisement: boolean;
  firstAdConsentTime: Date;
  grade: string;
  socialId: string;
  socialLoginIntegrationDuration: Date;
  memberState: string;
  alarmState: string[];
  lastLoginAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

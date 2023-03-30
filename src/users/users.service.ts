import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import * as uuid from 'uuid';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UsersService {
  constructor(private emailService: EmailService) {}

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<void> {
    await this.checkUserExists(email);

    const signupVerifyToken = uuid.v1();

    await this.saveUser(name, email, password, signupVerifyToken);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  async checkUserExists(email: string): Promise<void> {
    
  }

  async saveUser(
    name: string,
    email: string,
    password: string,
    verifyToken: string,
  ): Promise<void> {
    // TODO: Implement user saver
  }

  async sendMemberJoinEmail(
    email: string,
    signupVerifyToken: string,
  ): Promise<void> {
    await this.emailService.sendMemnerJoinEmail(email, signupVerifyToken);
  }

  async verifyEmail(signupVerifyToken: string):Promise<string> {
    // 1. 인증 처리 대기 중인 회원 조회 후 없으면 에러 처리
    // 2. 바로 로그인 상채가 되도록 JWT 발급
    
    throw new Error('Method not implemented.');
  }

  async login(email: string, password: string): Promise<string> {
    // TODO
    // 1. email, password를 가진 유저가 존재하는 지 확인 후 없으면 에러 처리
    // 2. JWT 발급

    throw new Error('Method not imoplmented.');
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  findOneWithHeader(id: number) {
    return 'Found One user with header';
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    if (+id < 1) {
      throw new BadRequestException('Id는 0보다 작은 값이여야 합니다.');
    }

    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

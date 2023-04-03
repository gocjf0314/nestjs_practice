import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import * as uuid from 'uuid';
import { EmailService } from 'src/email/email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { ulid } from 'ulid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private emailService: EmailService,
    private dataSource: DataSource,
  ) {}

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<void> {
    const isExist = await this.checkUserExists(email);
    if (isExist) {
      throw new UnprocessableEntityException(`This Email is already exist.`);
    }

    const signupVerifyToken = uuid.v1();

    try {
      // await this.saveUserUsingQueryRunner(
      //   name,
      //   email,
      //   password,
      //   signupVerifyToken,
      // );
      await this.saveUserUsingTransaction(
        name,
        email,
        password,
        signupVerifyToken,
      );
      // await this.saveUser(name, email, password, signupVerifyToken);
    } catch (e) {
      throw new InternalServerErrorException();
    }
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  private async checkUserExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    return user !== undefined && user !== null;
  }

  private async saveUser(
    name: string,
    email: string,
    password: string,
    verifyToken: string,
  ): Promise<void> {
    const user: UserEntity = new UserEntity();
    user.id = ulid();
    user.name = name;
    user.email = email;
    user.password = password;
    user.signupVerifyToken = verifyToken;
    await this.userRepository.save(user);
  }

  private async saveUserUsingQueryRunner(
    name: string,
    email: string,
    password: string,
    verifyToken: string,
  ): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.saveUser(name, email, password, verifyToken);
      // throw new InternalServerErrorException();
      await queryRunner.commitTransaction();
    } catch (e) {
      console.log('Roll back transaction');
      await queryRunner.rollbackTransaction();
    } finally {
      console.log('Release transaction');
      await queryRunner.release();
    }
  }

  private async saveUserUsingTransaction(
    name: string,
    email: string,
    password: string,
    verifyToken: string,
  ): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const user: UserEntity = new UserEntity();
      user.id = ulid();
      user.name = name;
      user.email = email;
      user.password = password;
      user.signupVerifyToken = verifyToken;

      await manager.save(user);

      // throw new InternalServerErrorException();
    });
  }

  async sendMemberJoinEmail(
    email: string,
    signupVerifyToken: string,
  ): Promise<void> {
    await this.emailService.sendMemnerJoinEmail(email, signupVerifyToken);
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    // 1. 인증 처리 대기 중인 회원 조회 후 없으면 에러 처리
    // 2. 바로 로그인 상채가 되도록 JWT 발급
    return signupVerifyToken;
    throw new Error('Method not implemented.');
  }

  async login(email: string, password: string): Promise<string> {
    // TODO
    // 1. email, password를 가진 유저가 존재하는 지 확인 후 없으면 에러 처리
    // 2. JWT 발급

    throw new Error('Method not imoplmented.');
  }

  findAll(offset: number, limit: number) {
    return `This action returns all users(offset ${offset}, limit: ${limit})`;
  }

  findOne(id: number) {
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

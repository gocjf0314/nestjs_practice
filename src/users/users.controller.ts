import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
  ValidationPipe,
  Headers,
  UseGuards,
  Inject,
  Logger,
  LoggerService,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './user.interface';
import { AuhtGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/role.decorator';

@Roles('user')
@Controller('users')
export class UsersController {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    private readonly usersService: UsersService,
  ) {}

  private printLoggerServiceLog(dto) {
    try {
      throw new InternalServerErrorException('test');
    } catch(e) {
      this.logger.error('error: ' + JSON.stringify(dto), e.stack);
    }
    this.logger.error('warn: ' + JSON.stringify(dto));
    this.logger.error('log: ' + JSON.stringify(dto));
    this.logger.error('verbose: ' + JSON.stringify(dto));
    this.logger.error('debug: ' + JSON.stringify(dto));
  }

  @Post()
  @Roles('admin')
  async createUser(@Body(ValidationPipe) dto: CreateUserDto): Promise<void> {
    this.printLoggerServiceLog(dto);
    const { name, email, password } = dto;
    await this.usersService.createUser(name, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = dto;
    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Query() dto: UserLoginDto): Promise<string> {
    const { email, password } = dto;
    return await this.usersService.login(email, password);
  }

  @UseGuards(AuhtGuard)
  @Get(':id')
  async getUserInfo(
    @Headers() headers: any,
    @Param('id')
    userId: string,
  ): Promise<UserInfo> {
    return this.usersService.getUserInfo(userId);
  }

  @Get()
  findAllUsers(
    @Query('offset', ParseIntPipe) offset: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.usersService.findAll(offset, limit);
  }
}

// // 리다이렉션 이용시 데코레이터에 url, statusCode 삽입
// @Redirect('https://nestjs.com', 301)
// @Get(':id')
// findOne(@Param('id') id: string) {
//   return this.usersService.findOne(+id);
// }

// // REST API 구성시 파라미터를 나눠서 요청 데이터 사용
// @Delete(':userId/memo/:memoId')
// deleteUserMemod(
//   @Param('userId') userId: string,
//   @Param('memoId') memoId: string,
// ) {
//   return `userId: ${userId}, memoId: ${memoId}`;
// }

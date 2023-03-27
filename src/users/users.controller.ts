import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    console.log(dto);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    console.log(dto);
    return '';
  }

  @Post('/login')
  async login(@Query() dto: UserLoginDto): Promise<string> {
    console.log(dto);
    return '';
  }

  @Get(':id')
  async getUserInfo(@Param('id') id: string): Promise<string> {
    return this.usersService.findOne(id);
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
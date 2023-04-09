import { Controller, Get, UseGuards, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User, UserData } from './users/user.decorator';
import { AuhtGuard } from './auth/auth.guard';
import { IsString } from 'class-validator';
import { AppService } from './app.service';

class UserEntity {
  @IsString()
  name: string;

  @IsString()
  email: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly configServie: ConfigService,
    private appService: AppService,
  ) {}

  @Get('/db-host-from-config')
  getDatabaseHostFromConfigService(): string {
    return this.configServie.get('DATABASE_HOST');
  }

  @Get()
  @UseGuards(AuhtGuard)
  getHello(@User() user: UserEntity) {
    this.appService.getHello();
    console.log(user);
  }

  @Get('/username')
  getHello2(@UserData('name') name: string) {
    console.log(name);
    return name;
  }

  @Get('/with-pipe')
  getHello3(
    @User(new ValidationPipe({ validateCustomDecorators: true }))
    user: UserEntity,
  ) {
    console.log(user);
  }
}

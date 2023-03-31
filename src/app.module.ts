import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ApiController } from './api/api.controller';
import { EmailModule } from './email/email.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import emailConfig from './config/emailConfig';

@Module({
  imports: [
    UsersModule,
    EmailModule,
    ConfigModule.forRoot({
      envFilePath: `[${__dirname}/config/env/.${process.env.NODE_ENV}.env]`,
      load: [emailConfig],
      isGlobal: true,
      
    }),
  ],
  controllers: [ApiController, AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}

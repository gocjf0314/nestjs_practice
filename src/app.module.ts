import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ApiController } from './api/api.controller';

@Module({
  imports: [UsersModule],
  controllers: [ApiController],
  providers: [AppService],
})
export class AppModule {}

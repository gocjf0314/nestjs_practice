import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly configServie: ConfigService) {}

  @Get('/db-host-from-config')
  getDatabaseHostFromConfigService(): string {
    return this.configServie.get('DATABASE_HOST');
  }
}

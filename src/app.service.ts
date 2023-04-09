import { Injectable, Logger } from '@nestjs/common';
import { MyLogger } from './logger/mylogger';

@Injectable()
export class AppService {
  constructor(private myLogger: MyLogger) {}

  getHello(): string {
    this.myLogger.error('level: error');
    this.myLogger.warn('level: warn');
    this.myLogger.log('level: log');
    this.myLogger.log('level: verbose');
    this.myLogger.log('level: debug');
    return 'Hello World!';
  }
}

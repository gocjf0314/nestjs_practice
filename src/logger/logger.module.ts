import { Module } from '@nestjs/common';
import { MyLogger } from './mylogger';

@Module({
    providers: [MyLogger],
    exports: [MyLogger],
})
export class LoggerModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OperatorsModule } from './operators/operators.module';

@Module({
  imports: [OperatorsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

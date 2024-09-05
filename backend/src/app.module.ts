import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OperatorsModule } from './operators/operators.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [OperatorsModule, ClientsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

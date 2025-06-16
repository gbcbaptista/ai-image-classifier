import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { ClassificationModule } from './classification/classification.module';

@Module({
  imports: [HealthModule, ClassificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'AI Image Classifier API Gateway - Ready to serve';
  }
}

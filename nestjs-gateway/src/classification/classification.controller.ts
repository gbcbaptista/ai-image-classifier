import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClassificationService } from './classification.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FILE_SIZE } from '../../constants';
import { ClassificationResponseDto } from './dto/classification-response.dto';

@Controller('classification')
export class ClassificationController {
  private readonly logger = new Logger(ClassificationController.name);
  constructor(private readonly classificationService: ClassificationService) {}

  @Get('health/ml')
  async checkMLService() {
    return this.classificationService.checkMLServiceHealth();
  }

  @Post('classify')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: FILE_SIZE,
      },
    }),
  )
  async classifyImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ClassificationResponseDto> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    this.logger.log(
      `Received classification request for: ${file.originalname}`,
    );

    return this.classificationService.classifyImage(file);
  }
}

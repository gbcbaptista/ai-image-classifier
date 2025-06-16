import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ClassificationResponseDto } from './dto/classification-response.dto';
import * as FormData from 'form-data';
import axios, { AxiosResponse } from 'axios';
import { FILE_SIZE } from '../../constants';

@Injectable()
export class ClassificationService {
  private readonly logger = new Logger(ClassificationService.name);
  private readonly ML_SERVICE_URL =
    process.env.ML_SERVICE_URL || 'http://localhost:8000';

  async classifyImage(
    file: Express.Multer.File,
  ): Promise<ClassificationResponseDto> {
    const startTime = Date.now();

    try {
      this.validateFile(file);

      const formData = new FormData();
      formData.append('file', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      this.logger.log(`Sending image ${file.originalname} to ML service`);

      const response: AxiosResponse = await axios.post(
        `${this.ML_SERVICE_URL}/predict`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
          timeout: 10000,
        },
      );

      const processingTime = Date.now() - startTime;
      this.logger.log(
        `Classification completed for ${file.originalname} in ${processingTime}ms`,
      );

      return {
        filename: file.originalname,
        predictions: response.data.predictions,
        processedAt: new Date(),
        processingTimeMs: processingTime,
      };
    } catch (error) {
      const processingTime = Date.now() - startTime;

      if (error.code === 'ECONREFUSED' || error.code === 'ENOTFOUND') {
        this.logger.error(`ML service unavailable: ${error.message}`);
        throw new ServiceUnavailableException(
          'ML service is currently unavailable',
        );
      }

      if (error.response?.status === 400) {
        this.logger.error(
          `ML service validation error: ${error.response.data.detail}`,
        );
      }

      this.logger.error(
        `Classification failed for ${file.originalname} after ${processingTime}ms: ${error.message}`,
      );
      throw new ServiceUnavailableException(
        'Failed to process image classification',
      );
    }
  }

  private validateFile(file: Express.Multer.File): void {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = FILE_SIZE;

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadGatewayException('Only JPEG and PNG images are allowed');
    }

    if (file.size > maxSize) {
      throw new BadRequestException('File size must be less than 10MB');
    }

    if (!file.buffer || file.buffer.length === 0) {
      throw new BadRequestException('File appears to be empty');
    }
  }

  async checkMLServiceHealth(): Promise<{ status: string; url: string }> {
    try {
      const response = await axios.get(`${this.ML_SERVICE_URL}/health`, {
        timeout: 5000,
      });

      return {
        status: 'healthy',
        url: this.ML_SERVICE_URL,
      };
    } catch (error) {
      this.logger.error(`ML service health check failed: ${error.message}`);
      return {
        status: 'unhealthy',
        url: this.ML_SERVICE_URL,
      };
    }
  }
}

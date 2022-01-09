import {
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
/**
 * ValidationPipe class
 */
export class ValidationPipe implements PipeTransform<any> {
  /**
   *
   * @param {any} value
   * @param {ArgumentMetadata} metadata
   * @return {any}
   */
  async transform(value, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('No data submitted');
    }

    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object, {
      whitelist: true,
      supressUnknownValues: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    });
    if (errors.length > 0) {
      throw new HttpException(
        { message: 'Invalid Payload', errors: this.buildError(errors) },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }

  /**
   *
   * @param {any} errors
   * @return {any}
   */
  private buildError(errors) {
    const result = {};
    errors.forEach((el) => {
      const prop = el.property;
      Object.entries(el.constraints).forEach((constraint) => {
        result[prop + constraint[0]] = `${constraint[1]}`;
      });
    });
    return result;
  }

  /**
   *
   * @param {any} metatype
   * @return {boolean}
   */
  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}

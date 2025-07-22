import { HttpException, HttpStatus } from '@nestjs/common';

export const TypeExceptions = {
  ProductNotFound(): HttpException {
    return new HttpException(
      {
        message: 'Product not found',
        error: 'Not Found',
        statusCode: HttpStatus.NOT_FOUND,
      },
      HttpStatus.NOT_FOUND,
    );
  },

  ProductAlreadyExists(): HttpException {
    return new HttpException(
      {
        message: 'Product already exists',
        error: 'ProductAlreadyExists',
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  },

  InvalidFile(): HttpException {
    return new HttpException(
      {
        message: 'Uploaded file is invalid',
        error: 'InvalidFile',
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  },
};

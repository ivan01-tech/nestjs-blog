import { HttpException } from '@nestjs/common';

export class ErrrorFilter extends HttpException {
  constructor(error: string, code: number) {
    super(error, code);
  }
}

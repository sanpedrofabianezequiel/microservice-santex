import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async health(): Promise<HttpStatus> {
    return HttpStatus.OK;
  }
}

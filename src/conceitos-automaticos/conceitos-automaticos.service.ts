import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosAutomaticosService {
  getHome() {
    return 'conceitos automaticos (Service)';
  }
}

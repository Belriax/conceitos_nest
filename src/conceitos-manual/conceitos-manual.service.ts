import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosManualService {
  solutionsHome(): string {
    return 'Método dos conceitos manual solucionado!!';
  }
}

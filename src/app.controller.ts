import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('home')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  getHello(): string {
    const retorno = 'Retorno.';
    return retorno;
  }

  // @Get('exemplo')
  exemplo() {
    return this.appService.solucionaExemplo();
  }
}

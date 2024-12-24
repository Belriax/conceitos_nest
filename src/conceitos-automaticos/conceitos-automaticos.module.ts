import { Module } from '@nestjs/common';
import { ConceitosAutomaticosController } from './conceitos-automaticos.controller';
import { ConceitosAutomaticosService } from './conceitos-automaticos.service';

@Module({
  controllers: [ConceitosAutomaticosController],
  providers: [ConceitosAutomaticosService],
})
export class ConceitosAutomaticosModule {}

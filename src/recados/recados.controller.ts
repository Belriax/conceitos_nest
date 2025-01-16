import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';
import { TimingConncetionInterceptor } from 'src/common/interceptors/timing-connection-interceptor';
import { AuthTokenGuard } from 'src/auth/guards/auth.token.guard';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}
  // encontrar todos os recados
  // recados
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TimingConncetionInterceptor)
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    const recados = this.recadosService.findAll(paginationDto);
    return recados;
  }

  // encontra um recado
  // recados/:id/
  @UseInterceptors(AddHeaderInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recadosService.findOne(+id);
  }

  @UseGuards(AuthTokenGuard)
  @Post()
  create(
    @Body() createRecadoDto: CreateRecadoDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.recadosService.create(createRecadoDto, tokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateRecadoDto: UpdateRecadoDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.recadosService.update(id, updateRecadoDto, tokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.recadosService.remove(Number(id), tokenPayload);
  }
}

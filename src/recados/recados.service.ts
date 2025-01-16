import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoaService } from 'src/pessoa/pessoa.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RecadosUtils } from './recados.utils';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
    private readonly pessoaService: PessoaService,
    private readonly recadoUtils: RecadosUtils,
  ) {}

  throwNotFoundError() {
    throw new NotFoundException('Recado não encontrado.');
  }

  async findAll(paginationDto?: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const recados = this.recadoRepository.find({
      take: limit,
      skip: offset,
      relations: ['de', 'para'],
      order: {
        id: 'asc',
      },
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });

    if ((await recados).length <= 0) return this.throwNotFoundError();

    return recados;
  }

  async findOne(id: number) {
    // const recado = this.recados.find(item => item.id === id);
    console.log(this.recadoUtils.invertString(''));
    const recado = await this.recadoRepository.findOne({
      where: { id },
      relations: ['de', 'para'],
      select: {
        de: {
          id: true,
          nome: true,
        },
      },
    });

    if (recado) return recado;
    throw new NotFoundException('O recado não foi encontrado!');
  }

  async create(
    createRecadoDto: CreateRecadoDto,
    tokenPayload: TokenPayloadDto,
  ) {
    const { paraId } = createRecadoDto;

    const para = await this.pessoaService.findOne(paraId);
    const de = await this.pessoaService.findOne(tokenPayload.sub);

    const newRecado = {
      texto: createRecadoDto.texto,
      de,
      para,
      lido: false,
      data: new Date(),
    };

    const recado = await this.recadoRepository.create(newRecado);

    this.recadoRepository.save(recado);

    return {
      ...recado,
      de: {
        id: recado.de.id,
        nome: recado.de.nome,
      },
      para: {
        id: recado.para.id,
        nome: recado.para.nome,
      },
    };
  }

  async update(
    id: number,
    updateRecadoDto: UpdateRecadoDto,
    tokenPayload: TokenPayloadDto,
  ) {
    const recado = await this.findOne(id);

    if (recado.de.id !== tokenPayload.sub) {
      throw new ForbiddenException('Esse recado não é seu!');
    }

    recado.texto = updateRecadoDto?.texto ?? recado.texto;
    recado.lido = updateRecadoDto?.lido ?? recado.lido;

    if (!recado) return this.throwNotFoundError();

    await this.recadoRepository.save(recado);

    return recado;
  }

  async remove(id: number, tokenPayload: TokenPayloadDto) {
    const recado = await this.findOne(id);

    if (recado.de.id !== tokenPayload.sub) {
      throw new ForbiddenException('Esse recado não é seu!');
    }

    await this.recadoRepository.remove(recado);

    return recado;
  }
}

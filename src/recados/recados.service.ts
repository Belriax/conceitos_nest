import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
  ) {}

  throwNotFoundError() {
    throw new NotFoundException('Recado não encontrado.');
  }

  async findAll() {
    const recados = this.recadoRepository.find();

    if ((await recados).length <= 0) return this.throwNotFoundError();
    return recados;
  }

  async findOne(id: number) {
    // const recado = this.recados.find(item => item.id === id);
    const recado = await this.recadoRepository.findOne({
      where: { id },
    });

    if (recado) return recado;
    throw new NotFoundException('O recado não foi encontrado!');
  }

  async create(createRecadoDto: CreateRecadoDto) {
    const newRecado = {
      ...createRecadoDto,
      lido: false,
      data: new Date(),
    };

    const novoRecado = await this.recadoRepository.create(newRecado);

    return this.recadoRepository.save(novoRecado);
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const partialUpdateRecadoDto = {
      lido: updateRecadoDto?.lido,
      texto: updateRecadoDto?.texto,
    };

    const recadoExistente = await this.recadoRepository.preload({
      id,
      ...partialUpdateRecadoDto,
    });

    if (!recadoExistente) return this.throwNotFoundError();

    await this.recadoRepository.save(recadoExistente);

    return recadoExistente;
  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOneBy({ id });

    if (!recado) return this.throwNotFoundError();

    return this.recadoRepository.remove(recado);
  }
}

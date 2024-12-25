import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PessoaService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {
    try {
      const dadosPessoa = {
        nome: createPessoaDto.nome,
        passwordHash: createPessoaDto.password,
        email: createPessoaDto.email,
      };

      const novaPessoa = this.pessoaRepository.create(dadosPessoa);

      await this.pessoaRepository.save(novaPessoa);
      return novaPessoa;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email já cadastrado.');
      }
      throw error;
    }
  }

  async findAll() {
    const pessoa = await this.pessoaRepository.find({
      order: {
        id: 'desc',
      },
    });

    return pessoa;
  }

  async findOne(id: number) {
    const pessoa = await this.pessoaRepository.findOne({
      where: { id },
    });

    if (!pessoa) {
      throw new NotFoundException(`Pessoa do ID ${id} não encontrado`);
    }

    return pessoa;
  }

  update(id: number, updatePessoaDto: UpdatePessoaDto) {
    return `This action updates a #${id} pessoa`;
  }

  async remove(id: number) {
    const pessoa = await this.findOne(id);

    if (!pessoa)
      throw new NotFoundException('Pessoa não existente na base de dados');

    return await this.pessoaRepository.remove(pessoa);
  }
}

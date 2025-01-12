import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from 'src/pessoa/entities/pessoa.entity';
import { Repository } from 'typeorm';
import { HashingService } from './hashing/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
    private readonly hashingService: HashingService,
  ) {}

  async login(loginDto: loginDto) {
    const pessoa = await this.pessoaRepository.findOneBy({
      email: loginDto.email,
    });

    const passwordIsValid = await this.hashingService.compare(
      loginDto.password,
      pessoa.passwordHash,
    );

    if (!pessoa || !passwordIsValid) {
      throw new UnauthorizedException('Usuário ou senha inválido');
    }

    return {
      message: 'Usuário logado com sucesso!',
    };
  }
}
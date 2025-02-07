import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from 'src/pessoa/entities/pessoa.entity';
import { Repository } from 'typeorm';
import { HashingService } from './hashing/hashing.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
    private readonly hashingService: HashingService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
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

    return this.createTokens(pessoa);
  }

  private async createTokens(pessoa: Pessoa) {
    const accessTokenPromisse = this.signJwtAsync<Partial<Pessoa>>(
      pessoa.id,
      this.jwtConfiguration.jwtTtl,
      { email: pessoa.email },
    );

    const refreshTokenPromise = this.signJwtAsync(
      pessoa.id,
      this.jwtConfiguration.jwtRefreshTtl,
    );

    const [accessToken, refreshToken] = await Promise.all([
      accessTokenPromisse,
      refreshTokenPromise,
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async signJwtAsync<T>(sub: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        this.jwtConfiguration,
      );

      const pessoa = await this.pessoaRepository.findOneBy({
        id: sub,
      });
      if (!pessoa) {
        throw new Error('Pessoa não encontrada,');
      }

      return this.createTokens(pessoa);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}

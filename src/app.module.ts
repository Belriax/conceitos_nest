import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ConceitosAutomaticosModule } from './conceitos-automaticos/conceitos-automaticos.module';
// import { ConceitosManualModule } from './conceitos-manual/conceitos-manual.module';
import { RecadosModule } from './recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaModule } from './pessoa/pessoa.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'postgres',
      password: '######',
      autoLoadEntities: true, // carrega entidades sem precisar especifica-las
      synchronize: true, //sincroniza com o db, não deve ser usado em produção.
    }),
    RecadosModule,
    PessoaModule,
    // ConceitosAutomaticosModule,
    // ConceitosManualModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

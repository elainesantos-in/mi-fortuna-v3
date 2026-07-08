import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasModule } from './categorias/categorias.module';
import { ReceitasModule } from './receitas/receitas.module';
import { FormaPagamentoModule } from './forma-pagamento/forma-pagamento.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { DespesasModule } from './despesas/despesas.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5433),
      username: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? '123456',
      database: process.env.DB_DATABASE ?? 'mifortuna',
      autoLoadEntities: true,
      synchronize: true,
      ssl:
        process.env.DB_SSL === 'true'
          ? { rejectUnauthorized: false }
          : false,
    }),
    CategoriasModule,
    ReceitasModule,
    FormaPagamentoModule,
    UsuariosModule,
    AuthModule,
    DespesasModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

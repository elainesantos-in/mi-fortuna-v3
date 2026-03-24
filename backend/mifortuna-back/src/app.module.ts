import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasModule } from './categorias/categorias.module';
import { ReceitasModule } from './receitas/receitas.module';
import { FormaPagamentoModule } from './forma-pagamento/forma-pagamento.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'mifortuna',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoriasModule,
    ReceitasModule,
    FormaPagamentoModule,
    UsuariosModule,
    AuthModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceitasService } from './receitas.service';
import { ReceitasController } from './receitas.controller';
import { Receita } from './entities/receita.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Receita]), AuthModule],
  controllers: [ReceitasController],
  providers: [ReceitasService],
})

export class ReceitasModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceitasService } from './receitas.service';
import { ReceitasController } from './receitas.controller';
import { Receita } from './entities/receita.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receita])],
  controllers: [ReceitasController],
  providers: [ReceitasService],
})

export class ReceitasModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receita } from './entities/receita.entity';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import { ILike } from 'typeorm';

@Injectable()
export class ReceitasService {
  constructor(
    @InjectRepository(Receita)
    private receitaRepository: Repository<Receita>,
) {}

  create(createReceitaDto: CreateReceitaDto) {
    const receita = this.receitaRepository.create(createReceitaDto);
    return this.receitaRepository.save(receita);
  }

  findAll(ativo?: boolean, nome?: string) {
    const where: any = {};
    if (ativo !== undefined) {
      where.ativo = ativo;
    }
    if (nome) {
      where.nome = ILike(`%${nome}%`);
    }
    return this.receitaRepository.find({ where });

  }

  update(id: number, updateReceitaDto: UpdateReceitaDto) {
    return this.receitaRepository.update(id, updateReceitaDto);
  }

}

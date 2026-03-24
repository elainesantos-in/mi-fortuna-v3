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

async  create(createReceitaDto: CreateReceitaDto, usuarioId: number) {
    const receita = this.receitaRepository.create({
      ...createReceitaDto,
      usuario: {id: usuarioId},
    });
    return this.receitaRepository.save(receita);
  }

  findAll(usuarioId: number, ativo?: boolean, nome?: string) {
    const where: any = { usuario: {id: usuarioId } };
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

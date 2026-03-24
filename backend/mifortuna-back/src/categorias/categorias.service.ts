import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { ILike } from 'typeorm';

@Injectable()
export class CategoriasService {
  
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

async create(createCategoriaDto: CreateCategoriaDto, usuarioId: number) {
    const categoria = this.categoriaRepository.create({
      ...createCategoriaDto,
      usuario: {id: usuarioId},
    })
    return this.categoriaRepository.save(categoria);
  }

  findAll(usuarioId: number, ativo?: boolean, nome?: string, ) {
    const where: any = { usuario: {id: usuarioId } };
    if (ativo !== undefined) {
      where.ativo = ativo;
    }
    if (nome) {
      where.nome = ILike(`%${nome}%`);
    }
    return this.categoriaRepository.find({ where });
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriaRepository.update(id, updateCategoriaDto);
  }

}


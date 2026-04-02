import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Despesa } from './entities/despesa.entity';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { ILike } from 'typeorm';

@Injectable()
export class DespesasService {
  constructor(
      @InjectRepository(Despesa)
      private despesaRepository: Repository<Despesa>,
    ) {}

  create(createDespesaDto: CreateDespesaDto, usuarioId) {
    const despesa = this.despesaRepository.create({
      ...createDespesaDto,
      // if(quantidadeParcelas > 1){
      //   for(let index 0 : index < quantidadeParcelas.length; index++)
      // }
      categoria: { id: createDespesaDto.categoria },
      formaPagamento: { id: createDespesaDto.formaPagamento },
      usuario: { id: usuarioId },
    })  
    return this.despesaRepository.save(despesa);
  }

  findAll(usuarioId: number, nome?: string, categoria?: number, formaPagamento?: number, status?: string) {
    const where: any = { usuario: {id: usuarioId }};

    if (nome) {
      where.nome = ILike(`%${nome}%`);
    }
    if(categoria){
      where.categoria = { id: categoria};
    }
    if(formaPagamento){
      where.formaPagamento = { id: formaPagamento}
    }
    if(status){
      where.status = ILike(`%${status}%`);
    }
    return this.despesaRepository.find({ where, relations: ['categoria','formaPagamento'] });
  }

  update(id: number, updateDespesaDto: UpdateDespesaDto) {
    const dados: any = { ...updateDespesaDto };
    if (updateDespesaDto.categoria) {
      dados.categoria = { id: updateDespesaDto.categoria };
    }
    if (updateDespesaDto.formaPagamento) {
      dados.formaPagamento = { id: updateDespesaDto.formaPagamento };
    }
    return this.despesaRepository.update(id, dados);
  }

  remove(id: number) {
    return this.despesaRepository.delete(id)
  }
  
}

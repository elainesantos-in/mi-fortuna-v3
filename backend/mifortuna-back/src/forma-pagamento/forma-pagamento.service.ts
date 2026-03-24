import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormaPagamento } from './entities/forma-pagamento.entity';
import { CreateFormaPagamentoDto } from './dto/create-forma-pagamento.dto';
import { UpdateFormaPagamentoDto } from './dto/update-forma-pagamento.dto';
import { ILike } from 'typeorm';


@Injectable()
export class FormaPagamentoService {
  constructor(
    @InjectRepository(FormaPagamento)
    private formaPagamentoRepository: Repository<FormaPagamento>,
  ) {}

  async  create(createFormaPagamentoDto: CreateFormaPagamentoDto, usuarioId: number) {
    const formaPagamento = this.formaPagamentoRepository.create({
      ...createFormaPagamentoDto,
      usuario: {id: usuarioId},
    })  
    return this.formaPagamentoRepository.save(formaPagamento);
  }

  findAll(usuarioId: number, ativo?: boolean, nome?: string) {
    const where: any = { usuario: {id: usuarioId } };
    if (ativo !== undefined) {
      where.ativo = ativo;
    }
    if (nome) {
      where.nome = ILike(`%${nome}%`);
    }
    return this.formaPagamentoRepository.find({ where });
  }

  update(id: number, updateFormaPagamentoDto: UpdateFormaPagamentoDto) {
    return this.formaPagamentoRepository.update(id, updateFormaPagamentoDto);
  }

}

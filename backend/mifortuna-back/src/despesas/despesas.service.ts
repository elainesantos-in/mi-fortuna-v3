import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Despesa } from './entities/despesa.entity';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { ILike } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class DespesasService {
  constructor(
      @InjectRepository(Despesa)
      private despesaRepository: Repository<Despesa>,
    ) {}

  create(createDespesaDto: CreateDespesaDto, usuarioId) {
    const parcelas = createDespesaDto.quantidadeParcelas

    if (parcelas && parcelas > 1) {
      const despesasCriadas: Despesa[] = []
      const grupo = v4();

      for (let i = 0; i < parcelas; i++) {
        const novaData = new Date(createDespesaDto.dataVencimento)
        novaData.setMonth(novaData.getMonth() + i)

        const despesa = this.despesaRepository.create({
          ...createDespesaDto,
          dataVencimento: novaData,
          parcelaAtual: i + 1,
          categoria: { id: createDespesaDto.categoria },
          formaPagamento: { id: createDespesaDto.formaPagamento },
          usuario: { id: usuarioId },
          grupoParcelas: grupo

        })
        despesasCriadas.push(despesa)
      }

      return this.despesaRepository.save(despesasCriadas)
    } else {
      const despesa = this.despesaRepository.create({
        ...createDespesaDto,
        categoria: { id: createDespesaDto.categoria },
        formaPagamento: { id: createDespesaDto.formaPagamento },
        usuario: { id: usuarioId },
      })
      return this.despesaRepository.save(despesa)
    }
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

  findOne(id: number) {
    const where: any = { usuario: { id: id }};

    return this.despesaRepository.find({ where });
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

  async remove(id: number, modo?:string ) {
    const despesa = await this.despesaRepository.findOne({ where: { id } });

    console.log("=== REMOVE chamado ===")
    console.log("id:", id, "modo:", modo)
    console.log("despesa encontrada:", despesa)


    if(!despesa){
      throw new Error('Despesas não encontrada')
    }

    if (modo === "apenas-atual" ){
      console.log(">>> Branch: apenas-atual, deletando id", id)
      return this.despesaRepository.delete(id)
    }
    if(modo === "futuras" ){
      console.log(">>> Branch: futuras, deletando grupo:", despesa.grupoParcelas, "parcelaAtual >=", despesa.parcelaAtual)
      return this.despesaRepository.delete(
          { 
            grupoParcelas: despesa.grupoParcelas,
            parcelaAtual : MoreThanOrEqual( despesa.parcelaAtual)
          }
        )
    }else{
      console.log(">>> Branch: default, deletando id", id)
      return this.despesaRepository.delete(id)
    }
  }
  
}

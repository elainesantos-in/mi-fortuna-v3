import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FormaPagamentoService } from './forma-pagamento.service';
import { CreateFormaPagamentoDto } from './dto/create-forma-pagamento.dto';
import { UpdateFormaPagamentoDto } from './dto/update-forma-pagamento.dto';

@Controller('forma-pagamento')
export class FormaPagamentoController {
  constructor(private readonly formaPagamentoService: FormaPagamentoService) {}

  @Post()
  create(@Body() createFormaPagamentoDto: CreateFormaPagamentoDto) {
    return this.formaPagamentoService.create(createFormaPagamentoDto);
  }

  @Get()
  findAll(@Query('ativo') ativo?: string, @Query('nome') nome?: string) {
    return this.formaPagamentoService.findAll(
        ativo !== undefined ? ativo === 'true' : undefined,
        nome
        );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormaPagamentoDto: UpdateFormaPagamentoDto) {
    return this.formaPagamentoService.update(+id, updateFormaPagamentoDto);
  }
}

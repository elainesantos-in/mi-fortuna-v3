import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards, Req } from '@nestjs/common';
import { FormaPagamentoService } from './forma-pagamento.service';
import { CreateFormaPagamentoDto } from './dto/create-forma-pagamento.dto';
import { UpdateFormaPagamentoDto } from './dto/update-forma-pagamento.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('forma-pagamento')
@UseGuards(JwtAuthGuard)
export class FormaPagamentoController {
  constructor(private readonly formaPagamentoService: FormaPagamentoService) {}

  @Post()
  create(@Body() createFormaPagamentoDto: CreateFormaPagamentoDto,  @Req() req) {
    return this.formaPagamentoService.create(createFormaPagamentoDto, req.usuario.sub);
  }

  @Get()
  findAll(@Query('ativo') ativo?: string, @Query('nome') nome?: string, @Req() req?) {
    return this.formaPagamentoService.findAll(
        req.usuario.sub,
        ativo !== undefined ? ativo === 'true' : undefined,
        nome
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormaPagamentoDto: UpdateFormaPagamentoDto) {
    return this.formaPagamentoService.update(+id, updateFormaPagamentoDto);
  }
}

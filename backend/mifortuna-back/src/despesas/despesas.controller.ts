import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { DespesasService } from './despesas.service';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('despesas')
@UseGuards(JwtAuthGuard)
export class DespesasController {
  constructor(private readonly despesasService: DespesasService) {}

  @Post()
  create(@Body() createDespesaDto: CreateDespesaDto, @Req() req) {
    return this.despesasService.create(createDespesaDto, req.usuario.sub);
  }

  @Get()
  findAll(
    @Req() req,
    @Query('nome') nome?: string,
    @Query('categoria') categoria?: string,
    @Query('formaPagamento') formaPagamento?: string,
    @Query('status') status?: string,
  ) {
    return this.despesasService.findAll(
      req.usuario.sub,
      nome,
      categoria ? +categoria : undefined,
      formaPagamento ? +formaPagamento : undefined,
      status,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDespesaDto: UpdateDespesaDto) {
    return this.despesasService.update(+id, updateDespesaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Query('modo') modo?: string,) {
    return this.despesasService.remove(+id, modo);
  }
}

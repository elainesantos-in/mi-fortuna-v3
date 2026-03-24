import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ReceitasService } from './receitas.service';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('receitas')
@UseGuards(JwtAuthGuard)
export class ReceitasController {
  constructor(private readonly receitasService: ReceitasService) {}

  @Post()
  create(@Body() createReceitaDto: CreateReceitaDto, @Req() req) {
    return this.receitasService.create(createReceitaDto, req.usuario.sub);
  }

  @Get()
  findAll(@Query('ativo') ativo?: string, @Query('nome') nome?: string, @Req() req?) {
      return this.receitasService.findAll(
        req.usuario.sub,
        ativo !== undefined ? ativo === 'true' : undefined,
        nome
      );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReceitaDto: UpdateReceitaDto) {
    return this.receitasService.update(+id, updateReceitaDto);
  }

}

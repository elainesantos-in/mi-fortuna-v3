import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards, Req } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('categorias')
@UseGuards(JwtAuthGuard)
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto, @Req() req) {
    return this.categoriasService.create(createCategoriaDto, req.usuario.sub);
  }

  @Get()
  findAll(@Query('ativo') ativo?: string, @Query('nome') nome?: string, @Req() req?) {
      return this.categoriasService.findAll(
        req.usuario.sub,
        ativo !== undefined ? ativo === 'true' : undefined,
        nome
      );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(+id, updateCategoriaDto);
  }

}

import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Head,
  Options,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: { nombre: string; edad: number }) {
    return this.usuariosService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { nombre: string; edad: number }) {
    return this.usuariosService.update(+id, body);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() body: { nombre?: string; edad?: number }) {
    return this.usuariosService.patch(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }

  // Método HEAD: Comprueba si el recurso existe (devuelve cabeceras sin cuerpo)
  @Head()
  headCheck() {
    return;
  }

  // Método OPTIONS: Devuelve los métodos HTTP permitidos para este recurso
  @Options()
  optionsCheck() {
    return {
      allowedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    };
  }
}
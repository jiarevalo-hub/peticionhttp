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
  // Inyecta el servicio de usuarios para comunicarse con la lógica de negocio
  constructor(private readonly usuariosService: UsuariosService) {}
// Método GET para listar todos los usuarios
  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }
// Método GET con parámetro para buscar un usuario por ID (ej: /usuarios/1)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }
// Método POST para registrar un nuevo usuario (devuelve código HTTP 201 Created)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: { nombre: string; edad: number }) {
    return this.usuariosService.create(body);
  }
// Método PUT para reemplazar por completo la información de un usuario
  @Put(':id')
  update(@Param('id') id: string, @Body() body: { nombre: string; edad: number }) {
    return this.usuariosService.update(+id, body);
  }
// Método PATCH para actualizar únicamente los campos enviados en el body
  @Patch(':id')
  patch(@Param('id') id: string, @Body() body: { nombre?: string; edad?: number }) {
    return this.usuariosService.patch(+id, body);
  }
// Método DELETE para eliminar un usuario del sistema mediante su ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }

  // Método HEAD para verificar la existencia del recurso (devuelve cabeceras sin cuerpo)
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

import { Injectable, NotFoundException } from '@nestjs/common';
import { TemporalUsuarios, UsuarioDto } from './temporal';

@Injectable()
export class UsuariosService {
  private temporalDB = new TemporalUsuarios();

  findAll() {
    return this.temporalDB.obtenerTodos();
  }

  findOne(id: number) {
    const usuario = this.temporalDB.obtenerPorId(id);
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return usuario;
  }

  create(createDto: Omit<UsuarioDto, 'id'>) {
    return this.temporalDB.crear(createDto);
  }

  update(id: number, updateDto: Omit<UsuarioDto, 'id'>) {
    const actualizado = this.temporalDB.actualizarCompleto(id, updateDto);
    if (!actualizado) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return actualizado;
  }

  patch(id: number, patchDto: Partial<Omit<UsuarioDto, 'id'>>) {
    const actualizado = this.temporalDB.actualizarParcial(id, patchDto);
    if (!actualizado) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return actualizado;
  }

  remove(id: number) {
    const eliminado = this.temporalDB.eliminar(id);
    if (!eliminado) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return { message: `Usuario con ID ${id} eliminado exitosamente` };
  }
}
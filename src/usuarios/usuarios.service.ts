import { Injectable, NotFoundException } from '@nestjs/common';
import { TemporalUsuarios, UsuarioDto } from './temporal';

@Injectable()
export class UsuariosService {
  // Instancia la clase temporal para usar los datos y métodos en memoria
  private temporalDB = new TemporalUsuarios();
// Llama al método para obtener la lista de usuarios
  findAll() {
    return this.temporalDB.obtenerTodos();
  }
// Busca un usuario y lanza una excepción HTTP 404 si no existe
  findOne(id: number) {
    const usuario = this.temporalDB.obtenerPorId(id);
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return usuario;
  }
// Delega la creación de un nuevo usuario
  create(createDto: Omit<UsuarioDto, 'id'>) {
    return this.temporalDB.crear(createDto);
  }
// Valida y ejecuta la actualización completa de un usuario
  update(id: number, updateDto: Omit<UsuarioDto, 'id'>) {
    const actualizado = this.temporalDB.actualizarCompleto(id, updateDto);
    if (!actualizado) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return actualizado;
  }
// Valida y ejecuta la actualización parcial de un usuario
  patch(id: number, patchDto: Partial<Omit<UsuarioDto, 'id'>>) {
    const actualizado = this.temporalDB.actualizarParcial(id, patchDto);
    if (!actualizado) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return actualizado;
  }
// Valida y ejecuta la eliminación de un usuario, retornando un mensaje de éxito
  remove(id: number) {
    const eliminado = this.temporalDB.eliminar(id);
    if (!eliminado) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return { message: `Usuario con ID ${id} eliminado exitosamente` };
  }
}

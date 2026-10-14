// Define el contrato (estructura) que debe cumplir un usuario
export interface UsuarioDto {
  id: number;
  nombre: string;
  edad: number;
}
// Clase encargada de manejar el almacenamiento y manipulación de datos en memoria
export class TemporalUsuarios {
  private usuarios: UsuarioDto[];
// Arreglo privado que almacena los usuarios
  constructor() {

    // Inicializa el arreglo
    this.usuarios = [
  
    ];
  }
// Retorna todos los elementos del arreglo

  public obtenerTodos(): UsuarioDto[] {
    return this.usuarios;
  }

  // Busca un usuario específico comparando su ID
  public obtenerPorId(id: number): UsuarioDto | undefined {
    return this.usuarios.find((u) => u.id === id);
  }
// Crea un nuevo registro calculando un ID automático e incrementable
  public crear(data: Omit<UsuarioDto, 'id'>): UsuarioDto {
    const nuevoId = this.usuarios.length > 0 ? Math.max(...this.usuarios.map((u) => u.id)) + 1 : 1;
    const nuevoUsuario: UsuarioDto = { id: nuevoId, ...data };
    this.usuarios.push(nuevoUsuario);
    return nuevoUsuario;
  }
// Reemplaza por completo los datos de un usuario existente (para PUT)
  public actualizarCompleto(id: number, data: Omit<UsuarioDto, 'id'>): UsuarioDto | null {
    const index = this.usuarios.findIndex((u) => u.id === id);
    if (index === -1) return null;
    
    this.usuarios[index] = { id, ...data };
    return this.usuarios[index];
  }

  // Reemplaza por completo los datos de un usuario existente (para PUT)
  public actualizarParcial(id: number, data: Partial<Omit<UsuarioDto, 'id'>>): UsuarioDto | null {
    const index = this.usuarios.findIndex((u) => u.id === id);
    if (index === -1) return null;

    this.usuarios[index] = { ...this.usuarios[index], ...data };
    return this.usuarios[index];
  }
// Elimina un usuario del arreglo buscando su índice y removiéndolo con splice
  public eliminar(id: number): boolean {
    const index = this.usuarios.findIndex((u) => u.id === id);
    if (index === -1) return false;

    this.usuarios.splice(index, 1);
    return true;
  }
}

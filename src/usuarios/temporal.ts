export interface UsuarioDto {
  id: number;
  nombre: string;
  edad: number;
}

export class TemporalUsuarios {
  private usuarios: UsuarioDto[];

  constructor() {
 
    this.usuarios = [
  
    ];
  }


  public obtenerTodos(): UsuarioDto[] {
    return this.usuarios;
  }

  public obtenerPorId(id: number): UsuarioDto | undefined {
    return this.usuarios.find((u) => u.id === id);
  }

  public crear(data: Omit<UsuarioDto, 'id'>): UsuarioDto {
    const nuevoId = this.usuarios.length > 0 ? Math.max(...this.usuarios.map((u) => u.id)) + 1 : 1;
    const nuevoUsuario: UsuarioDto = { id: nuevoId, ...data };
    this.usuarios.push(nuevoUsuario);
    return nuevoUsuario;
  }

  public actualizarCompleto(id: number, data: Omit<UsuarioDto, 'id'>): UsuarioDto | null {
    const index = this.usuarios.findIndex((u) => u.id === id);
    if (index === -1) return null;
    
    this.usuarios[index] = { id, ...data };
    return this.usuarios[index];
  }

  public actualizarParcial(id: number, data: Partial<Omit<UsuarioDto, 'id'>>): UsuarioDto | null {
    const index = this.usuarios.findIndex((u) => u.id === id);
    if (index === -1) return null;

    this.usuarios[index] = { ...this.usuarios[index], ...data };
    return this.usuarios[index];
  }

  public eliminar(id: number): boolean {
    const index = this.usuarios.findIndex((u) => u.id === id);
    if (index === -1) return false;

    this.usuarios.splice(index, 1);
    return true;
  }
}

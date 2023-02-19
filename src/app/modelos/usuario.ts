export interface UsuarioDto {
    id?: number;
    nombre?: string;
    apellido?: string;
    email?: string;
    telefono?: string;
    password?: string;
    estado?: string;
    roles?: string[];
}
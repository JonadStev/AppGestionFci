export interface UsuarioDocenteDto {
    id?: number;
    nombre?: string;
    apellido?: string;
    cedula?: string;
    email?: string;
    telefono?: string;
    password?: string;
    estado?: string;
    carrera?: number;
    roles?: string[];
}
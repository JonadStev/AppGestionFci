import { UsuarioDocenteDto } from "../gestion/usuarioDocente";

export interface ProyectoDto {
    id?: number;
    idProyecto?: string;
    nombre?: string;
    convocatoria?: string;
    estado?: string;
    fechaInicio?: string;
    fechaFin?: string;
    director?: UsuarioDocenteDto;
    investigadores?: UsuarioDocenteDto[];
    correoDirector?: string;
    telefonoDirector?: string;
    nombrecompletoDirector?: string;
}

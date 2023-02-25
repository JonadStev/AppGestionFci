import { UsuarioDocenteDto } from "../gestion/usuarioDocente";
import { ProyectoDto } from "./proyecto";

export interface HorasDto {
    id?: number;
    proyecto?: ProyectoDto;
    nombreProyecto?: string;
    convocatoria?: string;
    director?: UsuarioDocenteDto;
    informe?: string;
    detalle?: DetalleHorasDto[];
}

export interface DetalleHorasDto {
    id?: number;
    reqHoras?: string;
    horasTotalInvestigacionAsignada?: number;
    horasInvestigacionAsignadaProyecto?: number;
    horasInvestigacionAsignadaTitulacion?: number;
    numeroTrabajoTitulacion?: number;
    investigador?: UsuarioDocenteDto;
}
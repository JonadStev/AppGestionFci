import { ProyectoDto } from "../procesos/proyecto";
import { UsuarioDocenteDto } from "./usuarioDocente";

export interface ProductoDto {
    id?: number;
    proyecto?: ProyectoDto;
    nombreProyecto?: string;
    director?: UsuarioDocenteDto;
    estado?: string;
    pcPropuesto?: ProdCientificaDto;
    pcCumplido?: ProdCientificaDto;
    piPropuesto?: PropiedadIntelectualDto;
    piCumplido?: PropiedadIntelectualDto;
    conocimientoPropuesto?: ConocimientoDto;
    conocimientoCumplido?: ConocimientoDto;
    piramidePropuesto?: PiramideCientificaDto;
    piramideCumplido?: PiramideCientificaDto;
}

export interface ProdCientificaDto {
    id?: number;
    regional?: string;
    libros?: string;
    mundial?: string;
}

export interface PropiedadIntelectualDto {
    id?: number;
    industrial?: string;
    autor?: string;
    vegetal?: string;
}

export interface ConocimientoDto {
    id?: number;
    grupos?: string;
    redes?: string;
}

export interface PiramideCientificaDto {
    id?: number;
    grado?: string;
    postGrado?: string;
    doctorado?: string;
}
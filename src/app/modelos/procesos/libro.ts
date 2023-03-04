import { UsuarioDocenteDto } from "../gestion/usuarioDocente";

export interface LibroDto {
    id?: number;
    facultad?: string;
    codigoUg?: string;
    tipoPublicacion?: string;
    codigoPublicacion?: string;
    tituloLibro?: string;
    codigoIsbn?: string;
    editorCompilador?: string;
    paginas?: string;
    fechaPublicacion?: string;
    linkPublicacion?: string;
    campoDetallado?: number;
    filiacionUg?: string;
    revicionPorPares?: string;
    dominio?: string;
    linea?: string;
    sublinea?: string;
    docentes?: UsuarioDocenteDto[];
    tituloProyectoFci?: string;
    observacion?: string;
}

export interface LibroReporteDto {
    id?: number;
    facultad?: string;
    codigoUg?: string;
    tipoPublicacion?: string;
    codigoPublicacion?: string;
    tituloLibro?: string;
    codigoIsbn?: string;
    editorCompilador?: string;
    paginas?: string;
    fechaPublicacion?: string;
    linkPublicacion?: string;
    campoDetallado?: number;
    filiacionUg?: string;
    revicionPorPares?: string;
    dominio?: string;
    linea?: string;
    sublinea?: string;
    docentes?: string;
    tituloProyectoFci?: string;
    observacion?: string;
}
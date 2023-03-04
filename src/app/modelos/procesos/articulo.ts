import { UsuarioDocenteDto } from "../gestion/usuarioDocente";

export interface ArticuloDto {
    id?: number;
    facultad?: string;
    codigoUg?: string;
    tipoPublicacion?: string;
    codigoPublicacion?: string;
    tituloPublicacion?: string;
    doi?: string;
    baseDatosindexada?: string;
    codigoISSN?: string;
    tipoIndexacion?: string;
    nombreRevista?: string;
    numeroRevista?: string;
    quartil?: string;
    srjJcr?: string;
    fechaPublicacion?: string;
    campoDetallado?: number;
    estado?: string;
    linkPublicacion?: string;
    linkRevista?: string;
    filiacion?: string;
    dominio?: string;
    linea?: string;
    sublinea?: string;
    docentes?: UsuarioDocenteDto[];
    tituloProyectoFci?: string;
    observacion?: string;
}

export interface ArticuloReporteDto {
    id?: number;
    facultad?: string;
    codigoUg?: string;
    tipoPublicacion?: string;
    codigoPublicacion?: string;
    tituloPublicacion?: string;
    doi?: string;
    baseDatosindexada?: string;
    codigoISSN?: string;
    tipoIndexacion?: string;
    nombreRevista?: string;
    numeroRevista?: string;
    quartil?: string;
    srjJcr?: string;
    fechaPublicacion?: string;
    campoDetallado?: number;
    estado?: string;
    linkPublicacion?: string;
    linkRevista?: string;
    filiacion?: string;
    dominio?: string;
    linea?: string;
    sublinea?: string;
    docentes?: string;
    tituloProyectoFci?: string;
    observacion?: string;
}
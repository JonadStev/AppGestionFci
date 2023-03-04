import { UsuarioDocenteDto } from "../gestion/usuarioDocente";

export interface PonenciaDto {
    id?: number;
    facultad?: string;
    codigoUg?: string;
    tipoPublicacion?: string;
    codigoPublicacion?: string;
    nombrePonencia?: string;
    doi?: string;
    nombreEvento?: string;
    baseDatosIndexada?: string;
    codigoIsbnIss?: string;
    tipoIndexacion?: string;
    edicionEvento?: string;
    organizadorEvento?: string;
    comiteCientifico?: string;
    pais?: string;
    ciudad?: string;
    fechaPublicacion?: string;
    quartil?: string;
    sjrJcr?: string;
    campoDetallado?: number;
    linkPublicacion?: string;
    filiacionUg?: string;
    dominio?: string;
    linea?: string;
    sublinea?: string;
    docentes?: UsuarioDocenteDto[];
    tituloProyectoFci?: string;
    observacion?: string;
}

export interface PonenciaReporteDto {
    id?: number;
    facultad?: string;
    codigoUg?: string;
    tipoPublicacion?: string;
    codigoPublicacion?: string;
    nombrePonencia?: string;
    doi?: string;
    nombreEvento?: string;
    baseDatosIndexada?: string;
    codigoIsbnIss?: string;
    tipoIndexacion?: string;
    edicionEvento?: string;
    organizadorEvento?: string;
    comiteCientifico?: string;
    pais?: string;
    ciudad?: string;
    fechaPublicacion?: string;
    quartil?: string;
    sjrJcr?: string;
    campoDetallado?: number;
    linkPublicacion?: string;
    filiacionUg?: string;
    dominio?: string;
    linea?: string;
    sublinea?: string;
    docentes?: string;
    tituloProyectoFci?: string;
    observacion?: string;
}